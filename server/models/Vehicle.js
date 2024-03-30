const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
	user:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
	},
    name: {
        type: String,
        required: true,
    },
    plate: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('vehicle', vehicleSchema);