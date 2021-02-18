const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    
    return await jwt.sign(data, global.SALT_KEY, {expiresIn: '1d'});

}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY);
    return data
}

exports.authorize = function (req, res, next){
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if(!token){
        res.status(401).json({
            message:"Acesso restrito"
        });
    }else{
        jwt.verify(token, global.SALT_KEY, function (error, decoded){
            if(error){
                res.status(401).json({
                    message:"token invalido"
                })
            }else{
                next();
            }
        })
    }

}

exports.isAdmin = function (req, res, next){
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
   
    if(!token){
        res.status(400).json({
            message:"token invalido"
        });
    }   else{
        jwt.verify(token, function(error , decoded){
            if(error){
                res.status(401).json({
                    message:"Token invalido"
                });
            }else{
                if(decoded.roles.includes('admin')){
                    next();
                }else{
                    res.status(403).json({
                        message:"Essa funcionalidade é restrita para administradores"
                    })
                }
            }
        })
    }
}