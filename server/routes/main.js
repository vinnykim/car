const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')
const auth = require('../middlewares/admin')
const Product = require('../models/Product')
const Book = require('../models/Booking')
const Vehicle = require('../models/Vehicle')
const Payment = require('../models/Payment')
const Notification = require('../models/Notification')
const Company = require('../models/Company')
const Invoice = require("../models/Invoice")
const Category = require("../models/Category")
const Service = require("../models/Service")
//const upload = multer({ dest: 'files/assets/global/images/uploads/' });
const {formidable} = require('formidable');

//@route GET api/models/admin
//@access Private

router.get('/',  async (req, res) => {
	try {
	  const requests = {}
	  return res.status(200).json(requests)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})

router.post('/getReviews',auth,  async (req, res) => {
	try {
	  const result = {}
	  const company_id = req.user.company
	  result.reviews = []
	  result.message = "success"
	  
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})


router.post('/getCustomers',auth,  async (req, res) => {
	try {
	  const result = {}
	  const company_id = req.user.company
	  const books = await Book.find({company:company_id})
	  result.customers = []
	  for(var book of books){
		const r = {}
		r.book = book
		const user = await User.findById(book.user).select("-password")
		r.user = user
		result.customers.push = r
	  }
	  result.message = "success"
	  
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})


router.post('/getOrders',auth,  async (req, res) => {
	try {
	  const result = {}
	  const company_id = req.user.company
	  const vehicles = await Vehicle.find({company:company_id})
	  result.vehicles = vehicles
	  result.orders = []
	  for(var vehicle of vehicles){
		const r = {}
		r.vehicle = vehicle
		const books = await Book.find({vehicle:vehicle})
		r.books = []
		for(var book of books){
			const user = await User.findById(book.user).select("-password")
			const invoice = await Invoice.findById(book.invoice)
			r.books.push({book:book,user:user,invoice:invoice})
		}
		result.orders.push(r)
	  }
	  result.message = "success"
	  
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})

router.post('/newVehicle',auth,  async (req, res) => {
	try {
	  const result = {}
	  const data = req.body
	  if(!data.vehicleVin || !data.vehiclePrice || !data.vehicleModel || !data.vehicleModel){
		return res.status(400).json({message:"Required data missing"})
	  }
	  const vehicle = new Vehicle()
	  vehicle.description = data
	  vehicle.name = data.vehicleModel
	  vehicle.company = req.user.company
	  await vehicle.save()
	  result.message = "New Vehicle created"
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})

router.post('/newCategory',auth,  async (req, res) => {
	try {
	  const result = {}
	  result.message = "success"
	  const data = req.body
	  const category = new Category(data)
	  category.company = req.user.company
	  await category.save()
	  result.data = category
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})

router.post('/getCategories',auth,  async (req, res) => {
	try {
	  const result = {}
	  const company_id = req.user.company
	  const categories = await Category.find({company:company_id})
	  result.message = "success"
	  result.categories = categories
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})

router.post('/deleteCategory/:id',auth,  async (req, res) => {
	try {
	  const result = {}
	  const company_id = req.user.company
	  const category_id = req.params.id
	  const category = await Category.findById(category_id)
	  if(!category){
		result.message = "Category not found"
		return res.status(404).json(result)
	  }
	  if(category.company.toString() !== company_id){
		result.message = "Anauthorised request"
		return res.status(404).json(result)
	  }
	  await Category.findByIdAndDelete({_id:category_id})
	  result.message = "Category deleted successfully"
	  
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})



router.post('/uploadImage',auth,  async (req, res) => {
	try {
	  //upload.single("file"),
	  const result = {};
	  result.message = "incomplete"
	  const form = formidable({ multiples: true });
		form.parse(req, (err, fields, files) => {
			console.log('fields: ', fields);
			console.log('files: ', files);
			result.message = "Successfully uploaded"
			result.success = true
			return res.status(200).json(result)
		});
	  
	  
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error')
	}
})

router.post('/getVehicles', auth, async (req, res) => {
	try {
	  const company_id = req.user.company
	  const result = {}
	  const vehicles = await Vehicle.find({company:company_id})
	  result.vehicles = vehicles
		
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error='+error.message)
	}
  })

router.post('/getAnalysis', auth, async (req, res) => {
	try {
	  const company_id = req.user.company
	  const result = {}
	  const vehicles = await Vehicle.find({company:company_id})
	  result.vehicles = {data:vehicles,sale:0,rent:0,total:0}
	  const books = await Book.find({company:company_id})
	  result.books = books 
	  result.invoice ={data:[],total:0,complete:0,pending:0}
	  result.booked = []
	  result.latest = []
	  for(var book of books){
			const invoice = await Invoice.findById(book.invoice)
			if(invoice.complete === true){
				result.invoice.complete += invoice.amount
			}else{
				result.invoice.pending += invoice.amount
			}
			result.invoice.total += invoice.amount
			result.invoice.data.push(invoice)
	  }
	  for(var vehicle of vehicles){
			const r = {}
			r.vehicle = vehicle
			result.vehicles.total += 1
			//console.log(vehicle.description,vehicle)
			if(vehicle.description.vehicleStatus && vehicle.description.vehicleStatus.includes('rent')){
				result.vehicles.rent += 1
			}else{
				result.vehicles.sale += 1
			}
			const book = await Book.find({vehicle:vehicle._id})
			r.book = book
			result.booked.push(r)
	  }
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error='+error.message)
	}
  })


  router.post('/getDetail/:id', auth, async (req, res) => {
	try {
	  const company_id = req.user.company
	  const result = {}
	  const vehicle_id = req.params.id
	  const vehicle = await Vehicle.findById(vehicle_id)
	  if(!vehicle){
		return res.status(404).json({message:" Vehicle not found"})
	  }
	  result.vehicle = vehicle
	  const books = await Book.find({vehicle:vehicle})
	  result.books = {data:[],total:0,complete:0}
	  for(var book of books){
		if(book.complete){
			result.books.complete += 1
		}
		const r = {}
		const user = await User.findById(book.user)
		const invoice = await Invoice.findById(book.invoice)
		r.book = book
		r.user = user
		r.invoice = invoice
		result.books.total += 1
		result.books.data.push(r)
	  }
	  return res.status(200).json(result)
	} catch (error) {
	  console.error(error.message)
	  res.status(500).send('Server Error='+error.message)
	}
})


module.exports = router