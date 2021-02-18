const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title:{
        type: String,
        required: [true, "title required"],
        trim : true
    },
    slug:{
        type: String,
        required: [true, "o slug é obrigatório "],
        trim: true,
        index: true,
        unique: true
    },
    description : {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    active:{
        type: Boolean,
        required:true,
        default: true
    },
    tags: [{
        type:String,
        required:true
    }],
    image:{
        type: String,
        required: [true, "title required"],
        trim : true
    },
});

module.exports = schema