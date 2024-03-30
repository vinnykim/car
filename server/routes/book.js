const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Parking = require('../models/Parking')
const Book = require('../models/Booking')
const Vehicle = require('../models/Vehicle')
const Payment = require('../models/Payment')
const Spot = require('../models/Spot')
const Invoice = require('../models/Invoice')
const Notification = require('../models/Notification')
const Active = require('../models/Active')
const History = require('../models/History')


const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')
const auth = require('../middlewares/auth')

//@route GET api/booking
//@description Get all bookings
//@access Private

router.get('/getBookings', auth, async (req, res) => {
  try {
	const userid = req.user.id
    const bookings = await Book.find({ user:userid })
	const found = []
	for(const booking of bookings){
		const park = {}
		const spot = await Spot.findById(booking.spot);
		const active = await Active.findOne({booking:booking._id});
		const parking = await Parking.findById(spot.parking)
		const invoice = await Invoice.findById(booking.invoice)
		const vehicle = await Vehicle.findById(booking.vehicle);
		if(!invoice){continue}
		
		if(spot) park.spot = spot
		if(active) park.active = active
		if(parking) park.parking = parking
		if(vehicle) park.vehicle = vehicle
		park.booking = booking
		park.invoice = invoice
		found.push(park)		
	}
    return res.status(200).json(found)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})

router.get('/getBooking/:id', auth, async (req, res) => {
    
    const userid = req.user.id
	const bookid = req.params.id
	
    try {
		const booking = await Book.findById(bookid)
		if(!booking){
			return res.status(404).json({message:"No booking found"})
		}
		if(booking){
			const park = {}
			const spot = await Spot.findById(booking.spot);
			const parking = await Parking.findById(spot.parking)
			const active = await Active.findOne({booking:booking})
			const invoice = await Invoice.findById(booking.invoice)
			const vehicle = await Vehicle.findById(booking.vehicle);
			if(spot) park.spot = spot
			if(parking) park.parking = parking
			if(vehicle) park.vehicle = vehicle
			park.active = active
			park.booking = booking
			return res.status(200).json(park)
		}
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Server Error')
    }
})

router.put('/updateBooking/:id', auth, async (req, res) => {
  try {
	const stats = req.body
	const bookid = req.params.id
    const booking = await Book.findById(bookid)
	if(!booking){
		return res.status(404).json({message:"No booking found"})
	}
	await Book.findByIdAndUpdate(
		booking._id,
		{ $set: stats },
		 { new: true },
	)
	
    return res.status(200).json({message:"Booking updated success"})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})


//@route POST api/booking
//@description Add new booking
//@access Private

router.post('/newBooking/:id', auth, async (req, res) => {
    
    const userid = req.user.id
	const spotid = req.params.id
	let {checkin,checkout,vehicle,payment} = req.body
	var dc = new Date(checkin)
	var dt = new Date(checkout)
	if(dt.getTime() < dc.getTime()){return res.status(404).json({message:"Invalid Date period"})}
	const fields= {complete:false} 
    try {
	  const location = await Parking.findById(spotid)
	  if (!location) {
		return res.status(404).json({message:"Invalid spot"})
	  }
	  const sl = await Spot.find({parking:location._id})
	  var avl = 0
	  for(var l of sl){
		const bk = await Book.findOne({spot:l._id})
		if(!bk){avl+=1}  
	  }
	  if(avl === 0){
		return res.status(404).json({message:`No slots In ${location.name} Location`})  
	  }
      const user = await User.findById(userid)
	  if (!user) {
		return res.status(404).json({message:"Invalid user "})
	  }
	  const spots = await Spot.findOne({parking:location._id,booked:false})
	  
	  if(!spots){
		 return res.status(404).json({message:"No slots available for selected location"})
	  }
	  let avail_slots = spots
	 
	  const curr_spot =  avail_slots//[Math.floor(Math.random() * avail_slots.length)];
	  if(!curr_spot._id){
		return res.status(404).json({message:"No Slot"})
	  }
	  let booked = await Book.findOne({spot:curr_spot._id})
	  if(booked){
		return res.status(404).json({message:"Spot already booked"})
	  }
      const car = await Vehicle.findById(vehicle)
	  
	  if(!car){
		return res.status(404).json({message:"Invalid vehicle"})
	  }
	  let bookin = await Book.findOne({user:userid,parking:location._id,vehicle:car._id})
	  if(bookin){
		return res.status(404).json({message:"Parking already booked"})
	  }
	  
	  const fields = {}
	  fields.user = userid
	  fields.parking = location._id
	  fields.amount = location.price
	  if(checkin) fields.due = checkin
	  fields.company = location.company
	  if(payment){
		  const pay = await Payment.findById(payment)
		  if(!pay){
			return res.status(404).json({message:"Invalid payment option"})
		  }
		  fields.payment = pay._id
	  }
		const invoice = new Invoice(fields)
	    var book = new Book(fields)
		
		invoice.booking = book._id
		invoice.rate = location.rate
		book.spot = curr_spot._id
		invoice.booking = book._id
		book.user = userid	  
		book.parking = location._id 
		book.vehicle = car._id
		book.invoice = invoice._id
		book.complete = false
		if(checkin)book.checkin = checkin
		if(checkout)book.checkout = checkout
		let slot = await Spot.findById(curr_spot._id)
		
		if(slot.booked === false){
						
			if(book && invoice){
				await invoice.save()
				book = await book.save()
				await Spot.findByIdAndUpdate(
					curr_spot._id,
				  { $set: {booked:true} },
				  { new: true },  
				)
				
				const history = new Notification({description:`Made booking to ${location.name} parking for vehicle ${car.name}| Amount ${location.price} @ ${location.rate}`})
				history.user = userid
				await history.save()
			}
		}else{
			return res.status(404).json({message:"Slot not available try again"})
		}
		return res.status(200).json(book)

    } catch (error) {
      console.log(error.message)
      res.status(500).send('Server Error '+error.message)
    }
 })

router.delete('/deleteBooking/:id', auth, async (req, res) => {
  try {
    
	const userid = req.user.id
	const bookid = req.params.id
	const book = await Book.findById(bookid)
    if (!book) return res.status(404).json({ message: 'Booking not found' })

    // Make sure user owns contact
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    await Book.findByIdAndRemove(req.params.id)
	await Invoice.findByIdAndUpdate(
		book.invoice,
	  { $set: {deleted:true,date:Date.now()} },
	  { new: true },
	)
	const history = History.findOne({user:userid,booking:bookid})
	if(history){
		await History.findByIdAndUpdate(
			history._id,
		  { $set: {deleted:true,date:Date.now()} },
		  { new: true },
		)
	}

    return res.status(200).json({ message: 'Booking removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


router.get('/getAll/users', auth, async (req, res) => {
  try {
	
    const users = await User.find({  }).select("-password")
	const found = []
	
	
    return res.status(200).json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})

module.exports = router
