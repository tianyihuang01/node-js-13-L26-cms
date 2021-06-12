const Joi = require('joi');
const Course = require('../models/course');

// function tryCatch(routeHandler) {
// 	return (req, res, next) => {
// 		try {
// 			routeHandler(req, res, next);
// 		} catch (e) {
// 			return e;
// 		}
// 	};
// }

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
	// const { code, name, description } = req.body;
	// validation
	const nameValidator = Joi.string().min(2).max(10).required();
	const codeValidator = Joi.string()
		.regex(/^[a-zA-Z0-9]+$/)
		.required();
	const schema = Joi.object({
		name: nameValidator,
		code: codeValidator,
		description: Joi.string(),
	});
	const { code, name, description } = await schema.validateAsync(req.body, {
		allowUnknown: true,
		stripUnknown: true,
		abortEarly: false,
	});

	// handle error approach 1
	// try {
	// 	const { code, name, description } = await schema.validateAsync(req.body, {
	// 		allowUnknown: true,
	// 		stripUnknown: true,
	// 		abortEarly: false,
	// 	});
	// } catch (e) {
	// 	return res.send(e);
	// }

	// handle error approach 2 (NOT TESTED)
	// course.save((error, result) => {
	// 	if (error) next(e);
	// 	res.status(201).json(result);
	// });

	// handle error approach 3 (NOT TESTED)
	// course
	// 	.save()
	// 	.then((result) => {
	// 		res.status(201).json(result);
	// 	})
	// 	.catch((error) => {
	// 		next(error);
	// 	});

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
