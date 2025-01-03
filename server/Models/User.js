const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type :String,
        required : true,
    },
    password : {
        type : String,
        required: true,
    },
    account_type : {
        type : String,
        required: true,
    }
});

module.exports = mongoose.model('User',UserSchema);