const mongoose = require('mongoose');

const handlerSchema = mongoose.Schema({
	company:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
	},
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        
    },
    
    password: {
        type: String,
        required: true,
    },
	active:{
		type: Boolean,
        default: false,
	},
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('handler', handlerSchema);