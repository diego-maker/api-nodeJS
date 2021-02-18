const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name:{
        type: String,
        required: [true, "name required"],
    },
    email:{
        type: String,
        required: [true, "email required"],
    },
    password:{
        type: String,
        required: [true, "password required"],
    },
    roles: [{
        type:String,
        required:true,
        enum: ['user', 'admin'],
        default: 'user'
    }],
    image:{
        type: String,
        required: [true, "title required"],
        trim : true
    }
});

module.exports = schema