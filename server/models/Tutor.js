const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			unique: true
		},
		password: { type: String, required: true },
		role: { type: String, required: true, default: 'tutor' },
		languages: { type: [String], required: true },
		yearsOfExperience: { type: Number, required: true },
		rating: { type: Number, default: 0 },
		classes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Class',
				default: []
			}
		],
		slotsAvailability: [
			{
				id: { type: String },
				date: { type: Date },
				startTime: { type: Date },
				duration: { type: Number },
				price: { type: Number },
				language: { type: String }
			}
		]
	},
	{
		timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
	}
);

tutorSchema.index({ email: 1 }, { unique: true });

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
