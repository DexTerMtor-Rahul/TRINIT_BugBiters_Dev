const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
	{
		language: { type: String, required: true },
		tutor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tutor',
			required: true
		},
		startTime: { type: Date, required: true },
		duration: { type: Number, required: true },
		price: { type: Number, required: true },
		isCancelled: { type: Boolean, required: true, default: false },
		level: { type: String, required: true },
		videoId: { type: String, required: true }
	},
	{
		timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
	}
);

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
