const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middlewares/admin')
const aus = require('../middlewares/auth')
const Spot = require('../models/Spot')
const Book = require('../models/Booking')
const Parking = require('../models/Parking')
const Vehicle = require('../models/Vehicle')
const Payment = require('../models/Payment')
const Company = require('../models/Company')
const Invoice = require('../models/Invoice')
const Notification = require('../models/Notification')
const Parked = require('../models/Parked')
const Active = require('../models/Active')

//@route GET api/parking
//@description Get all parking
//@access Private

router.get('/getParkings',aus, async (req, res) => {
  try {
    const parkings = await Parking.find({  })
	const results = []
	for(const parking of parkings){
		const company= await Company.findById(parking.company).select("-password")
		results.push({parking:parking,company:company})
	}
	
    return res.status(200).json(results)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})



router.get('/getParking/:id', aus, async (req, res) => {
  try {
    const parkings = await Parking.findById(req.params.id)
	if(!parkings){
		return res.status(404).json({message:"Parking data not found"})
	}
	const result = {}
	result.parking = parkings
	const spots = await Spot.find({parking:parkings})
	const sk = {free:0,filled:0,data:spots}
	const bookings = await Book.find({parking:parkings})
	for(const s of spots){
		if(s.booked===false){
			sk.free+=1
		}else{
			sk.filled+=1
		}
	}
	result.spots = sk
	result.bookings = bookings
    return res.status(200).json(result)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.get('/getDetailed/:id', auth, async (req, res) => {
  try {
	 const detail = {}
    const parkings = await Parking.findById(req.params.id)
	
	if(!parkings){
		return res.status(404).json({message:"Parking data not found"})
	}
	const locations = await Parking.find({company:req.user.company})
	const spots = await Spot.find({parking:req.params.id})
	const bookings = await Book.find({parking:req.params.id})
	const bk = {complete:0,total:bookings.length,data:bookings,active:0}
	const inv = {complete:0,total:0,incomes:0}
	for(const booking of bookings){
		const invoice = await Invoice.find({booking:booking._id})
		const parked = await Active.findOne({booking:booking._id})
		for(const i of invoice){
			
			if(i.complete === true){
				inv.complete = inv.complete+1
				inv.incomes = inv.incomes+i.amount
			}
			inv.total = inv.total+1
		}
		if(booking.complete === true){
			bk.complete = bk.complete+1
		}
		if(parked){
			bk.active = bk.active+1
		}
		
	}
	detail.invoice = inv
	detail.bookings = bk
	const sk = {total:parkings.spots,filled:0,inactive:0,bookings:0,data:spots}
	for(const slot of spots){
		const booked = await Book.find({spot:slot._id})
		for(const b of booked){
			sk.bookings = sk.bookings+1
			if(b.complete === false){
				sk.filled = sk.filled+1
			}
		}
		if(slot.inactive === true){
			sk.inactive = sk.inactive+1
		}
	}
	detail.slots = sk
	detail.parking = parkings
	detail.locations = locations
    return res.status(200).json(detail)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

//@route POST api/parking
//@description Add new parking
//@access Private

router.post(
  '/addParking',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
	  check('position', 'location coordinates is required').isLength({ min: 5 }),
	  check('price', 'Price is required').not().isEmpty(),
      check('email', 'Please include email for location').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
	const msgs = [];
    if (!errors.isEmpty()) {
		for(const e of errors.array()){
			msgs.push(e.msg)
		}
        return res.status(400).send({message: msgs })
    }

    const { name, email,spots,price,rate, position,phone,description } = req.body
	
	const parkingFields = {}
	if (name) parkingFields.name = name
	if (spots) parkingFields.spots = spots
	if (price) parkingFields.price = price
	if (rate) parkingFields.rate = rate
	if (position) parkingFields.address = position
	if (email) parkingFields.email = email
	if (phone) parkingFields.phone = phone
	if (description) parkingFields.description = description
    parkingFields.company = req.user.company

    try {
      const newParking = new Parking(parkingFields )
	  const notification = new Notification({description:`New Parking ${newParking.name} added`})
      const parking = await newParking.save()
	  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	  for(let i=0;i<parseInt(spots);i++){
		  const sl = new Spot({parking:parking._id,name:labels[i % labels.length]+i})
		  await sl.save()
	  }
	  notification.user = req.user.company
	  await notification.save()
      return res.status(200).json(parking)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  },
)


//@route PUT api/parking/:id
//@description Update a Parking
//@access Private

router.put('/update/:id', auth, async (req, res) => {
  const { name, price, rate, type,spots,address,description } = req.body

  
  const parkingFields = {}
	if (name) parkingFields.name = name
	if (spots) parkingFields.spots = spots
	if (price) parkingFields.price = price
	if (rate) parkingFields.rate = rate
	if (address) parkingFields.address = address
	if (type) parkingFields.type = type
	if (description) parkingFields.description= description

  try {
    let parking = await Parking.findById(req.params.id)

    if (!parking) return res.status(404).json({ message: 'Parking not found' })

    /*/ Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }
	*/
    parking = await Parking.findByIdAndUpdate(
      req.params.id,
      { $set: parkingFields },
      { new: true },
    )

    return res.status(200).json(parking)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.put('/updateSpot/:id', auth, async (req, res) => {
	const { name } = req.body
  
	
	const parkingFields = {}
	  if (name) parkingFields.name = name
	 
	try {
	  let parking = await Spot.findById(req.params.id)
  
	  if (!parking) return res.status(404).json({ message: 'SPOT not found' })
  
	  
	  parking = await Spot.findByIdAndUpdate(
		req.params.id,
		{ $set: parkingFields },
		{ new: true },
	  )
  
	  return res.status(200).json(parking)
	} catch (err) {
	  console.error(err.message)
	  res.status(500).send('Server Error')
	}
  })
  


router.put('/newSpot/:id', auth, async (req, res) => {
  const { name } = req.body

  
  const parkingSpot = {}
	if (name) parkingSpot.name = name
	parkingSpot.parking = req.params.id
	
  try {
    let parking = await Parking.findById(req.params.id)

    if (!parking) return res.status(404).json({ message: 'Parking not found' })

    let newSpot = new Spot(parkingSpot )
	newSpot = await newSpot.save()
    return res.status(200).json(newSpot)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route DELETE api/parking/:id
//@description Delete a parking 
//@access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const parking = await Parking.findById(req.params.id)

    if (!parking) return res.status(404).json({ message: 'parking not found' })

    if(parking.company.toString()!== req.user.company){
		return res.status(401).json({ message: 'Not authorized' })
	}
	const notification = new Notification({description:`Parking ${parking.name} deleted`})
	const slots = await Spot.find({parking:parking._id})
	var found = 0
	for(const slot of slots){
		if(slot.parked){
			found = 1
			continue
		}
		await Spot.findByIdAndRemove(slot._id)
	}
	if(found === 0){
		await Parking.findByIdAndRemove(req.params.id)
	}else{
		notification.description = `Parking location ${parking.name} could not be deleted since some slots are currently booked or parked`
	}
    
	await notification.save()
    return res.status(200).json({ message: 'parking removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.delete('/removeSpot/:id', auth, async (req, res) => {
  try{
	const spot = await Spot.findById(req.params.id)

    if (!spot) return res.status(404).json({ message: 'parking spot not found' })
	const bookings = Book.find({spot:spot._id})
	for(const booking of bookings){
		if(booking.complete === false){
			return res.status(400).json({ message: 'parking spot still has unclosed bookings' })
		}
	}
    await Spot.findByIdAndRemove(req.params.id)

    return res.status(200).json({ message: 'parking slot removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
