const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')
const auth = require('../middlewares/auth')
const Book = require("../models/Booking")
const Company = require("../models/Company")
const Vehicle = require("../models/Vehicle")
const Profile = require('../models/Profile')
const Category = require("../models/Category")

router.post('/book/:id',auth,  async (req, res) => {
	try {
	  const result = {}
	  const data = req.body
	  const Vehicle_id = req.params.id
	  const vehicle = await Vehicle.findById(Vehicle_id)
	  if(!vehicle){
		result.message = "Vehicle not available"
		return res.status(404).json(result)
	  }
	  const company = await Company.findById(vehicle.company)
	  const book = new Book(data)
	  book.user = req.user.id
	  book.company = company._id
	  await book.save()
	  result.message = "Booking complete"
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})


router.post('/deleteBook/:id',auth,  async (req, res) => {
	try {
	  const result = {}
	  const data = req.body
	  const book_id = req.params.id
	  const book = await Book.findById(book_id)
	  if(!book){
		result.message = "Book not available"
		return res.status(404).json(result)
	  }
	  if(book.user.toString() === req.user.id){
		await Book.findByIdAndDelete(book._id)
		result.message = "Booking removed succsffully"
	  }else{
		result.message = "Anaouthirised acess"
		return res.status(401).jons(result)
	  }
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})



//@route DELETE api/models/users
//@description Delete a vehicle
//@access Private

router.delete('/deleteVehicle/:id', auth, async (req, res) => {
  try {
   
    return res.status(200).json({ message: 'Vehicle removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route GET api/models/users
//@description Get user Payment
//@access Private

router.post('/getBookings', auth, async (req, res) => {
  try {
	const userid = req.user.id
	const result = {}
    const books = await Book.find({user:userid})
	result.bookings = []
	for(var book of books){
		const r = {}
		r.book = book
		const company = await Company.findOne({company:book.company})
		r.company = company
		const vehicle = await Vehicle.findById(book.Vehicle)
		r.vehicle= vehicle
		data = []
		for(var categ of vehicle.category){
			const category = await Category.findById(categ)
			data.push(category)
		}
		r.vehicle.category = data
		result.bookings.push(r)
	}
    return res.status(200).json(result)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error='+error.message)
  }
})

router.post('/getVehicles',  async (req, res) => {
	try {
	  
	  const result = {}
	  const vehicles = await Vehicle.find({})
	  result.vehicles = vehicles
		
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error='+error.message)
	}
  })

  router.post('/getCategories/:id',  async (req, res) => {
	try {
	  
	  const result = {}
	  const Vehicle_id = req.params.id
	  const Vehicle = await Vehicle.findById(Vehicle_id)
	  if(!Vehicle){
		result.message = "Vehicle not found"
		return res.status(404).json(result)
	  }
	  result.Vehicle = Vehicle
	  categs = []
	  for(var category_id of Vehicle.categories){
		if(category_id !== ''){
			const category = await Category.findById(category_id)
			if(category){
				categs.push(category)
			}
		}
	  }
	  result.categories = categs
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error='+error.message)
	}
  })


module.exports = router