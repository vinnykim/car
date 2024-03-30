const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'user',
	},
	vehicle_year:{
		type:String,
	},
	service_date:{
		type:Date,
		required:true,
	},
	service_category:{
		type:Array,
		default:[]
	},
	service_time:{
		type:Date,
		
	},
	vehicle_make:{
		type:String,
	},
	vehcile_mileage:{
		type:String,
	},
	
	checkout:{
		type:Date,
		
	},
	
	saved:{
		type:Boolean,
		default:true,
	},
	complete:{
		type:Boolean,
		default: false,
	},

	comments:{
		type:String,

	},
	
    date: {
        type: Date,
        default: Date.now(),
    }
	
});

module.exports = mongoose.model('booking', BookingSchema);