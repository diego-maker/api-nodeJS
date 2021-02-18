const mongoose = require('mongoose');
const cutomerSchema = require('../models/customer-description');

const Customer = mongoose.model('customerDescription', cutomerSchema, 'customerDescription');

exports.create = async (data) => {
    let customer =  new Customer(data)
    await customer.save()
}



exports.put = async (id ,data) => {
    await Customer.findByIdAndUpdate(id ,{
       $set: {
        companhia: data.companhia,
        primeiroNome: data.primeiroNome,
        sobrenome:data.sobrenome,
        endereco:data.endereco,
        cidade:data.cidade,
        pais:data.pais,
        cep:data.cep,
        sobre:data.sobre,
        cargoEmpresa: data.cargoEmpresa,
        resumoPerfil: data.resumoPerfil
       }
   })
}


exports.getById = async (id) => {
    let req = await Customer.findOne({
        idCustomer: id
    });
    return req
}