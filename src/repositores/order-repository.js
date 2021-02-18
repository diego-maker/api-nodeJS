const mongoose = require('mongoose');
const orderSchema = require('../models/order');

const Order = mongoose.model('order', orderSchema, 'order');

exports.create = async (data) => {
    let order = new Order(data)
    await order.save()
}

exports.get = async () => {
    let res = await Order
    .find({}, 'number status customer items')
        .populate('customer', 'name')
        .populate('items.product', 'title')
        
    return res
}