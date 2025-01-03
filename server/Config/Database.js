const mongoose = require('mongoose');
require('dotenv').config();
exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
            .then(() => {console.log('connected')})
            .catch((e) => {console.log(' not connected')});
}