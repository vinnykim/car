const mongoose = require('mongoose');

const spotSchema = mongoose.Schema({
	
    parking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parking'
    },
	
    name: {
        type: String,
		required:true
    },
	
	inactive:{
		type:Boolean,
		default:false,
	},
	parked:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'parked'
	},
	booked:{
		type: Boolean,
		default:false
	},
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('spot', spotSchema);