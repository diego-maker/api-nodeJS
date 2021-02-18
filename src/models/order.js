const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
    },
    number: {
        type: String,
        required: [true, "number required"],
    },
    createDate: {
        type: Date,
        required: [true, "date required"],
        default: Date.now
    },
    status: {
        type: String,
        required: [true, "date required"],
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
       
    }]
});

module.exports = schema