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
const Invoice = require('../models/Invoice')
const Wish = require("../models/Wish")

router.post('/getCart',auth,  async (req, res) => {
	try {
	  const result = {}
	  result.cart = {complete:[],pending: [],total:0}
	  const user_id = req.user.id
	  const invoices = await Invoice.find({user:user_id})
	  for(var invoice of invoices){
		const r = {}
		r.invoice = invoice
		const book = await Book.findById(invoice.booking)
		if(book){
			const vehicle = await Vehicle.findById(book.vehicle)
			r.vehicle = vehicle
			r.book = book
			if(invoice.complete === true){
				result.cart.complete.push(r)
			}else{
				result.cart.pending.push(r)
			}
			result.cart.total += 1
		}
	  }
	
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})

router.post('/getWish',auth,  async (req, res) => {
	try {
	  const result = {}
	  result.wishlist = {complete:[],pending: [],total:0}
	  const user_id = req.user.id
	  const invoices = await Wish.find({user:user_id})
	  for(var invoice of invoices){
		const r = {}
		r.invoice = invoice
		const book = await Book.findOne({vehicle:invoice.vehicle,user:user_id})
		
		const vehicle = await Vehicle.findById(invoice.vehicle)
		r.vehicle = vehicle
		r.book = book
		if(book && book.complete === true){
			result.wishlist.complete.push(r)
		}else{
			result.wishlist.pending.push(r)
		}
		result.wishlist.total += 1
		
	  }
	
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})

router.post('/addWish',auth,  async (req, res) => {
	try {
	  const result = {}
	  const user_id = req.user.id
	  const {vehicle_id}= req.body
	  if(!vehicle_id){
		return res.status(400).json({nessage:"No vehicle identified"})
	  }
	  const vehicle = await Vehicle.findById(vehicle_id)
	  if(!vehicle){
		result.message = "Vehicle not available"
		return res.status(404).json(result)
	  }
	  const wished = await Wish.findOne({user:user_id,vehicle:vehicle_id})
	  if(wished){
		await Wish.findByIdAndRemove(wished._id)
		return res.status(200).json({message:"Removed from wishlist"})
	  }
	  const company = await Company.findById(vehicle.company)
	  const wish = new Wish()
	  wish.user = user_id
	  wish.vehicle = vehicle_id
	  wish.company = company._id
	  result.message = "Added to wishlist"
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})



router.post('/addCart',auth,  async (req, res) => {
	try {
	  const result = {}
	  const user_id = req.user.id
	  const {vehicle_id}= req.body
	  if(!vehicle_id){
		return res.status(400).json({nessage:"No vehicle identified"})
	  }
	  const vehicle = await Vehicle.findById(vehicle_id)
	  if(!vehicle){
		result.message = "Vehicle not available"
		return res.status(404).json(result)
	  }
	  const booked = await Book.findOne({user:user_id,vehicle:vehicle_id})
	  if(booked){
		return res.status(200).json({message: "Already booked",book:booked})
	  }
	  const company = await Company.findById(vehicle.company)
	  const invoice = new Invoice()
	  const book = new Book()
	  book.vehicle = vehicle_id
	  book.user = req.user.id
	  book.company = company._id
	  invoice.company = company._id
	  invoice.booking = book._id
	  invoice.user = user_id
	  invoice.amomunt = vehicle.description.vehiclePrice 
	  await invoice.save()
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

router.post('/getVehicle/:id',  async (req, res) => {
	try {
	  
	  const result = {}
	  const vehicle_id = req.params.id
	  const vehicles = await Vehicle.findById(vehicle_id)
	  if(!vehicles){
		return res.status(404).json({message:"No vehicle with specified ID found"})
	  }
	  const company = await Company.findById(vehicles.company)
	  result.company = company ? company : {}
	  result.vehicle = vehicles
		
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