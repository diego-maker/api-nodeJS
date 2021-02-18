const orderRepository = require('../repositores/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.post = async  (req, res, next) => {

  try { 

    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decodeToken= await authService.decodeToken(token);
  
    let data = await orderRepository.create({
        customer:decodeToken.id,
        number: guid.raw().substring(0 , 6),
        items : req.body.items
    });
    res.status(201).send({message:"Pedido cadastrado com sucesso", sucess:true, data: data})
  } catch (error) {
    console.log(error);
    res.status(400).send({message:"Erro ao realizar o pedido", sucess:false, data:error})
  }
}


exports.get = async (req, res, next) => {
    try {
      let data = await orderRepository.get();
      res.status(200).send(data);
    } catch (e) {
      res.status(400).send({ message: "Erro ao processar a requisição", data: e })
    }
  }