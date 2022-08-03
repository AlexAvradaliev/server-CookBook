const responseErrors = () => (error, req, res, next) => {
	console.log(error)
	if (error.status) {
		res.status(error.status).json(error.errors)
	} else {
		res.status(500).json({
			message: 'Server Error',
		});
	};
};

module.exports = responseErrors;