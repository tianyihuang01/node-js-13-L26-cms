const { Schema, model } = require('mongoose');

const schema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		minlength: 2,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
});

module.exports = model('User', schema);
