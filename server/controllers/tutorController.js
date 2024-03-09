const Tutor = require('../models/Tutor');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

exports.viewAllTutors = async (req, res) => {
	try {
		const tutors = await Tutor.find();
		res.json(tutors);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ errors: ['Internal server error'] });
	}
};

exports.viewSingleTutor = async (req, res) => {
	try {
		const { id } = req.params,
			tutor = await Tutor.findById(id).populate('classes');
		if (!tutor) return res.status(404).json({ errors: ['Tutor not found'] });
		res.json(tutor);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ errors: ['Internal server error'] });
	}
};

exports.updateTutor = async (req, res) => {
	try {
		const { id } = req.params,
			tutor = await Tutor.findByIdAndUpdate(id, req.body, { new: true });
		if (!tutor) return res.status(404).json({ errors: ['Tutor not found'] });
		res.json(tutor);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ errors: ['Internal server error'] });
	}
};

exports.deleteTutor = async (req, res) => {
	try {
		const { id } = req.params,
			tutor = await Tutor.findByIdAndDelete(id);
		if (!tutor) return res.status(404).json({ errors: ['Tutor not found'] });
		res.json(tutor);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ errors: ['Internal server error'] });
	}
};

// Add a Slot to a Tutor with rate limiting
exports.addSlot = async (req, res) => {
	try {
		const { id } = req.params,
			tutor = await Tutor.findById(id);
		if (!tutor) return res.status(404).json({ errors: ['Tutor not found'] });
		req.body.id = uuidv4();
		tutor.slotsAvailability.push(req.body);
		await tutor.save();
		res.json(tutor);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ errors: ['Internal server error'] });
	}
};

// Delete a Slot from a Tutor with rate limiting
exports.deleteSlot = async (req, res) => {
	try {
		const { id, slotId } = req.params;
		const tutor = await Tutor.findById(id);
		if (!tutor) return res.status(404).json({ errors: ['Tutor not found'] });
		const slots = tutor.slotsAvailability.filter((slot) => slot._id != slotId);
		tutor.slotsAvailability = slots;
		await tutor.save();
		res.json(tutor);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ errors: ['Internal server error'] });
	}
};

// Add a Class to a Tutor with rate limiting
exports.addClass = async (req, res) => {
	try {
		const { id } = req.params,
			tutor = await Tutor.findById(id);
		if (!tutor) return res.status(404).json({ errors: ['Tutor not found'] });
		tutor.classes.push(req.body);
		await tutor.save();
		res.json(tutor);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ errors: ['Internal server error'] });
	}
};
