const mongoose = require('mongoose');

const hostelSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
       
		default: 3000,
    },
    phone: {
        type: Number,
		default: 254
    },
    type : {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now(),
    },
	saved:{
		type:Boolean,
		default:false,
	}
	
});

module.exports = mongoose.model('hostel', hostelSchema);