const mongoose = require('mongoose');

exports.connectToDB = () => {
	let database = process.env.DB_NAME || 'js-cms';
	if (process.env.NODE_ENV === 'test') database += '_test';

	const connectionString =
		(process.env.CONNECTION_STRING || 'mongodb://localhost:27017/') + database;
	const db = mongoose.connection;
	db.on('connected', () => {
		console.log(`DB connected with ${connectionString}`);
	});
	db.on('error', (error) => {
		console.log('DB connection failed');
		console.log(error.message);
		process.exit(1);
	});
	db.on('disconnected', () => {
		console.log('disconnected');
	});

	mongoose.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

exports.disconnectDB = async () => {
	return mongoose.disconnect();
};
