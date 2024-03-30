const mongoose = require('mongoose');

const towSchema = mongoose.Schema({
	user:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
	},
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle'
    },
	tower:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'tower'
	},
	
    towedin: {
        type: Date,
        required: true,
    },
	towedout: {
        type: Date,
        
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('tow', towSchema);