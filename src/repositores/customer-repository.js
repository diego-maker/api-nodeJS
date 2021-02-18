const mongoose = require('mongoose');
const cutomerSchema = require('../models/customer');

const Customer = mongoose.model('customer', cutomerSchema, 'customer');

exports.create = async (data) => {
    let customer =  new Customer(data)
    await customer.save()
}

exports.authenticate = async (data) => {
    let res = await Customer.findOne({
        password: data.password,
        email: data.email
    })
    return res
}

exports.get = async (data) => {
    let res = await Customer.findOne({
        email: data.email,
        name:data.name
    })
    return res
}

exports.put = async (id, data) => {
    console.log(data)
    await Customer.findByIdAndUpdate(id, {
       $set: {
           image:data
       }
   })
}

exports.getDefaultImage = async (id) => {
    let res = await Customer.findById(id)
    return res.image
}

