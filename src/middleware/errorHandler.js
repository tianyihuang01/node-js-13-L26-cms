module.exports = (error, req, res, next) => {
	if (error.name === 'ValidationError') {
		if (process.env.NODE_ENV === 'production') {
			const { details } = error;
			// const errorMsg = details.map((i) => ({
			// 	message: i.message,
			// }));
			const errorMsg = details;
			return res.status(400).json(errorMsg);
		} else {
			return res.status(400).json(error);
		}
	}

	// other error
	return res.status(500).send('something unexpected, try again later.');

	// res.json(error);
};
