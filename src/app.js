
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const config = require('./config')

const app = express();
mongoose.connect(config.connectionString , { useNewUrlParser:true,  useUnifiedTopology: true});


//CARREGANDO MODELS
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//CARREGANDO AS ROTAS
const productRoutes = require('../routes/product-route');
const cutomerRoutes = require('../routes/customer-route');
const orderRoutes = require('../routes/order-route');
const index = require('../routes/index');
const customerDescriptionRoutes= require('../routes/customer-description-route');
//BODY PARSER


app.use(bodyParser.json({
    limit:'5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
//USANDO ROTAS 
app.use('/Orders', orderRoutes );
app.use('/Product', productRoutes );
app.use('/Customer', cutomerRoutes );
app.use('/CustomerDescription', customerDescriptionRoutes );
app.use('/', index);

module.exports = app