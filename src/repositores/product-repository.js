const mongoose = require('mongoose');
const produtoSchema = require('../models/product');

const Product = mongoose.model('product', produtoSchema, 'product');

exports.get = async () => {
    let res = await Product.find(
        {
            active: true,
        }, 'title price slug'
    )
    return res
}

exports.getBySlug = async (slug) => {
    let res = await Product.findOne({
        slug: slug,
        active: true
    }, 'title price slug description tags');

    return res
}

exports.getById = async (id) => {
    let res = await  Product.findById(id);
    return res;
}

exports.getByTags = async (tags) => {
    let res = await Product.find({
        tags: tags,
        active: true
    }, 'title price slug description tags');
    return res
}

exports.create = async (data) => {
    let product =  new Product(data)
    await product.save()
}

exports.put = async (id, data) => {
     await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    })
  
}

exports.delete = async (id) => {
   await  Product.findByIdAndRemove(id);
    
}