const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

module.exports =  function connectDB() {
	try {
		 mongoose.connect(process.env.DB_CONNECT, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	
		console.log(`MongoDB Connected `);

	} catch (error) {
		console.error(`Database Error: ${error.message}`);
        process.exit(1);
	};
};

