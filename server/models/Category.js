const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    paypal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paypal'
    },
    stripe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stripe'
    },
    shipping:{
        type:Array,
    },
    tax:{
        type:Array,
    },
    name: {
        type: String,
		required:true
    },
	description:{
        type:String,
    },
	status:{
		type:Boolean,
		default:false,
	},
	price:{
		type: Number,
	},
    price_type:{
        type:Boolean,
        default:false,
    },

    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('category', categorySchema);