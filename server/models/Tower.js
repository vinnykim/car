const mongoose = require('mongoose');

const towerSchema = mongoose.Schema({
	company:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
	},
    name: {
        type: String,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
    },
	active:{
		type: Boolean,
        default: false,
	},
	rate:{
		type: Number,
        default: 1,
	},
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('tower', towerSchema);