const { Schema, model } = require('mongoose');

const schema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
	},
	courses: [{ type: String, ref: 'Course' }],
});

module.exports = model('Student', schema);
