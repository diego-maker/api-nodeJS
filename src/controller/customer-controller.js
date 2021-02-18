const customerRepository = require('../repositores/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');
const azure = require('azure-storage');
const config = require('../config');
const guid = require('guid');


exports.authenticate = async (req, res, next) => {

  try {
    let customer = await customerRepository.authenticate({
      email: req.body.email,
      password: md5(req.body.password)
    });
    
      if(customer.length === 0){
        res.status(404).send({
          message: "Usuario ou senha invalidos"
        })
        return;
      }
    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      role: customer.roles
    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name
      }
    })
  } catch (error) {
    res.status(400).send( error )
  }

}


exports.refreshToken = async (req, res, next) => {

  try {

    const tokenRefresh = req.body.token || req.query.token || req.headers['x-access-token'];
    const decodeToken= await authService.decodeToken(tokenRefresh);
     
    let customer = await customerRepository.getById(decodeToken.id);
    
      if(customer.length === 0){
        res.status(404).send({
          message: "Cliente não encontrado"
        })
        return;
      }
    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      role: customer.roles

    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name
      }
    })
  } catch (error) {
    res.status(400).send( error )
  }

}



exports.post = async (req, res, next) => {

  try {
    const blob = azure.createBlobService(config.userImagesBlobConnectionString);
    let image = req.body.image
    
    if(image === undefined){
       image = await customerRepository.getDefaultImage(config.imageDefault)
    }
    
    let filename = guid.raw().toString() + '.jpg';
    let rawdata = image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2],'base64');

    await blob.createBlockBlobFromText('cutomer-images', filename, buffer, {
      contentType: type
    }, function(error, result, response){
      if(error){
        filename = 'happy.jpg'
      }
    }
    )

    let data = await customerRepository.create({
      email: req.body.email,
      password: md5(req.body.password),
      name:req.body.name,
      roles: ['user'],
      image:'https://nodestrr.blob.core.windows.net/cutomer-images/'+ filename
    });
    try {
      await emailService.send(req.body.email,
        "Email enviado pela minha api NodeJs",
        global.EMAIL_TMPL.replace('{0}',
          req.body.name));
    } catch (error) {
      res.status(400).send({
        data: error
      });
    }
    res.status(201).send({ message: "Customer cadastrado com sucesso", sucess: true, data: data })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Erro ao realizar o cadastro", sucess: false, data: error })
  }

}


exports.updateImage = async (req, res, next) => {

  try {
    const blob = azure.createBlobService(config.userImagesBlobConnectionString);

    let filename = guid.raw().toString() + '.jpg';
    let rawdata = req.body.image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2],'base64');

    await blob.createBlockBlobFromText('cutomer-images', filename, buffer, {
      contentType: type
    }, function(error, result, response){
      if(error){
        filename = 'happy'
      }
    }
    )
    let idCustomer = await customerRepository.get(req.body);
    let data = await customerRepository.put(
      idCustomer._id,
      'https://nodestrr.blob.core.windows.net/cutomer-images/'+ filename
    );

    res.status(201).send({ message: "Customer image atualizado com sucesso", sucess: true, data: data })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Erro ao realizar o cadastro", sucess: false, data: error })
  }

}

exports.postFindImage = async (req,res, next) => {
  try {
    let valores = await customerRepository.get(req.body);
    res.status(200).send(valores);
  } catch (e) {
    res.status(400).send({ message: "Erro ao processar a requisição", data: e })
  }
}