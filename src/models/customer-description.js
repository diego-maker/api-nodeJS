const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idCustomer:{
        type: String,
        required: [true, "id customer required"],
        unique:[true, "apenas um usuario por descrição"]
    },
    companhia:{
        type: String,
        required: [true, "companhia required"],
    },
    primeiroNome:{
        type: String,
        required: [true, "primeiroNome required"],
    },
    sobrenome:{
        type: String,
        required: false,
    },
    endereco:{
        type: String,
        required: [true, "endereço is required"],
    },
    cidade:{
        type: String,
        required: [true, "cidade is required"],
    },
    pais:{
        type: String,
        required: [true, "país is required"],
    },
    cep:{
        type: Number,
        required: [true, "cep is required"],
    },
    sobre:{
        type: String,
        required: false,
    }
});

module.exports = schema