
const productRepository = require('../repositores/product-repository');
const azure = require('azure-storage');
const config = require('../config');
const guid = require('guid');

exports.post = async  (req, res, next) => {
  
  try {
    //Cria o blob service
    const blob = azure.createBlobService(config.userImagesBlobConnectionString);

    let filename = guid.raw().toString() + '.jpg';
    let rawdata = req.body.image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2],'base64');

    await blob.createBlockBlobFromText('product-images', filename, buffer, {
      contentType: type
    }, function(error, result, response){
      if(error){
        filename = 'default-product'
      }
    }
    )
    let data = await productRepository.create({
      title:req.body.title,
      slug:req.body.slug,
      description:req.body.description,
      price:req.body.price,
      active: true,
      tags:req.body.tags,
      image:'https://nodestrr.blob.core.windows.net/product-images/'+filename
    });
    res.status(201).send({message:"Produto cadastrado com sucesso", sucess:true, data: data})
  } catch (error) {
    res.status(400).send({message:"Erro ao realizar o cadastro", sucess:false, data:error})
  }
  
}

exports.put = async (req, res, next) => {

  try {
    let data = await productRepository.put(req.params.id, req.body);
    res.status(201).send({message:"Produto atualizado com sucesso", sucess:true, data:data});    
  } catch (error) {
    res.status(400).send({message:"Erro ao realizar a atualização", sucess:false, data:error})
  }  
}



exports.delete = async (req, res, next) => {

  try {
    let data = await productRepository.delete(req.body.id);
    res.status(200).send({message:"Produto removido com sucesso", sucess:true, data:data});
  } catch (error) {
    res.status(400).send({message:"Erro ao realizar" , sucess:false, data:error})
  }

}

exports.get = async (req, res, next) => {

  try {
    let data = await productRepository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send({ message: "Erro ao processar a requisição", data: e })
  }


}

exports.getBySlug = async (req, res, next) => {
  try {

    let data = await productRepository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Erro ao realizar a requisição", data: error })
  }

}

exports.getById = async (req, res, next) => {

  try {
    let data = await productRepository.getById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Erro ao realizar a requisição", data: error })
  }

}

exports.getByTags = async (req, res, next) => {

  try {
    let data = await productRepository.getByTags(req.params.tag)
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Erro ao realizar a requisição ", data: error })
  }

}