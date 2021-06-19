const User = require('../models/user');
// const { generateToken } = require('../utils/jwt');

async function addUser(req, res) {
	const { username, password } = req.body;

	const existedUser = await User.findOne({ username }).exec();
	if (existedUser) return res.status(409).json('User already exist !!');

	const user = new User({ username, password });
	await user.hashPassword();
	await user.save();

	// token config
	// const token = generateToken({ id: user._id });
	// return res.status(201).json({ token, username });

	return res.json(user);
}

module.exports = { addUser };
