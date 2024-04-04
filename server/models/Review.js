const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
	company:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
	},
    
	user:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
	},

    invoice:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'invoice'
	},
	vehicle:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle'
	},
    description:{
        type:String,
    },
    rating:{
        type:Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('review', reviewSchema);