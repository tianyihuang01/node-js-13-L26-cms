const Course = require('../models/course');

async function getAllCourses(req, res) {
	const course = await Course.find().exec();
	if (!course) {
		return res.sendStatus(404);
	}
	return res.json(course);
}

async function getCourseById(req, res) {
	const { id } = req.params;
	const course = await Course.findById(id).exec();
	if (!course) {
		return res.sendStatus(404);
	}
	return res.json(course);
}

async function updateCourseById(req, res) {
	const { id } = req.params;
	const { name, description } = req.body;
	const course = await Course.findByIdAndUpdate(
		id,
		{ name, description },
		{ new: true }
	).exec();
	if (!course) {
		return res.sendStatus(404);
	}
	return res.json(course);
}

async function deleteCourseById(req, res) {
	const { id } = req.params;
	const course = await Course.findByIdAndDelete(id).exec();
	if (!course) {
		return res.sendStatus(404);
	}
	return res.json(course);
}

async function createCourse(req, res) {
	const { code, name, description } = req.body;
	// validation
	const course = new Course({ _id: code, name, description });
	await course.save();
	return res.status(201).json(course);
}

module.exports = {
	getAllCourses,
	getCourseById,
	updateCourseById,
	deleteCourseById,
	createCourse,
};
