const customerRepository = require('../repositores/customer-description-repository');
const customerRepositoryId = require('../repositores/customer-repository');


exports.post = async (req, res, next) => {

    try {

        let idCustomer = await customerId.get(req.body);

        let customerDescription = await customerRepository.create({
            idCustomer: idCustomer._id,
            companhia: req.body.companhia,
            primeiroNome: req.body.primeiroNome,
            sobrenome: req.body.sobrenome,
            endereco: req.body.endereco,
            cidade: req.body.cidade,
            pais: req.body.pais,
            cep: req.body.cep,
            sobre: req.body.sobre,
            cargoEmpresa:req.body.cargoEmpresa,
            resumoPerfil:req.body.resumoPerfil
        });
        res.status(201).send({
            message: "Customer cadastrado com sucesso", sucess: true, data: customerDescription
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Erro ao realizar o cadastro", sucess: false, data: error })
    }

}


exports.put = async (req, res, next) => {

    try {
        let idCustomer = await customerRepositoryId.get(req.body);
        let idPutCustomer = await customerRepository.getById(idCustomer._id)
        let customerDescription = await customerRepository.put(idPutCustomer._id, req.body);

        res.status(201).send({
            message: "Customer atualizado com sucesso", sucess: true, data: customerDescription
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Erro ao realizar o cadastro", sucess: false, data: error })
    }

}


exports.getId = async (req, res, next) => {

    try {
        let customerId = await customerRepositoryId.get(req.body);

        let customerDescription = await customerRepository.getById(customerId._id);
        console.log(customerDescription)
        res.status(201).send({ data: customerDescription })
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Erro ao realizar a requisição", sucess: false, data: error })
    }

}