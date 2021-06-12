const Joi = require('joi');
const Student = require('../models/student');
const Course = require('../models/course');

async function getAllStudents(req, res) {
	const student = await Student.find().exec();
	if (!student) return res.sendStatus(404);
	return res.json(student);
}

async function getStudentById(req, res) {
	const { id } = req.params;
	const student = await Student.findById(id).exec();
	if (!student) return res.sendStatus(404);
	return res.json(student);
}

async function updateStudentById(req, res) {
	const { id } = req.params;
	const { firstName, lastName, email } = req.body;
	const student = await Student.findByIdAndUpdate(
		id,
		{ firstName, lastName, email },
		{ new: true }
	).exec();
	if (!student) return res.sendStatus(404);
	return res.json(student);
}

async function deleteStudentById(req, res) {
	const { id } = req.params;
	const student = await Student.findByIdAndDelete(id).exec();
	if (!student) return res.sendStatus(404);
	await Course.updateMany(
		// { _id: { $in: student.courses } },
		{ students: student._id },
		{ $pull: { students: student._id } }
	);
	return res.json(student);
}

async function createStudent(req, res) {
	const { firstName, lastName, email } = req.body;
	// validation
	const student = Student({ firstName, lastName, email });
	await student.save();
	return res.status(201).json(student);
}

async function addStudentToCourse(req, res) {
	// get student id, get course code
	const { id, code } = req.params;
	// find student
	const student = await Student.findById(id).exec();
	// find course
	const course = await Course.findById(code).exec();
	// check student or course exist
	if (!student || !course) return res.status(404);
	// if (student.courses.includes(course._id))
	// const oldLength = student.courses.length;
	// check student is already enrolled
	// add student to course
	student.courses.addToSet(course._id);
	course.students.addToSet(student._id);
	await student.save();
	await course.save();
	// return updated student or return 200/201
	return res.json(student);
}

async function removeStudentFromCourse(req, res) {
	// get student id, get course code
	const { id, code } = req.params;
	// find student
	const student = await Student.findById(id).exec();
	// find course
	const course = await Course.findById(code).exec();
	// check student or course exist
	if (!student || !course) return res.status(404);
	// if (student.courses.includes(course._id))
	// const oldLength = student.courses.length;
	// check student is already enrolled
	// remove student from course
	student.courses.pull(course._id);
	course.students.pull(student._id);
	await student.save();
	await course.save();
	// return updated student or return 200/201
	return res.json(student);
}

module.exports = {
	getAllStudents,
	getStudentById,
	updateStudentById,
	deleteStudentById,
	createStudent,
	addStudentToCourse,
	removeStudentFromCourse,
};
