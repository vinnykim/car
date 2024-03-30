const mongoose = require('mongoose');

const parkedSchema = mongoose.Schema({
	booking:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'booking'
	},
	vehicle:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle'
	},
    spot:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'spot'
	},
	user:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
	},
	status:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'active'
	},
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('parked', parkedSchema);