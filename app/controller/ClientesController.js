var jwt = require('jsonwebtoken');

module.exports = (app, clienteModel) => {
    app.post('/clientes', function (req, res) {
        const authHeader = req.headers['authorization'];
        token = authHeader.replace('Bearer ',)

        jwt.verify(token,'secretKey', function (err, token) {
            if (err) {
                console.log('invalid token')

                res.status(401)
                res.send({message: 'Unauthorized'})
            } else {
                console.log('valid token')
                clienteNuevo = req.body;             

                if ( token.area === clienteNuevo.area) {
                    clienteModel.create(clienteNuevo).then(resp => {
                        res.send(resp)
                    });

                } else {
                    res.send({
                        message:'No se pueden agregar clientes a otra area diferente a: ' + token.area
                    })
                }
            }
        })
    })

    app.get('/clientes', function (req, res) {
        const authHeader = req.headers['authorization'];
        token = authHeader.replace('Bearer ', '')
        
        jwt.verify(token,'secretKey', function(err, token) {
            if (err) {
                console.log('invalid token')

                res.status(401)
                res.send({message: 'Unauthorized'})
            } else {
                console.log('valid token')
                clienteNuevo = req.body; 
                
                if (token.role === 'administrador') {
                    clienteModel.findAll().then((resp) => {
                        res.send(resp)
                    });
                } else {
                    clienteModel.findAll({
                        where: {
                            area: token.area
                        }
                    }).then((resp) => {
                        res.send(resp)
                    })
                }
            }
        })
    })
    app.get('/clientes/:id'), function (req,res) {
        const authHeader = rer.headers['authorization'];
        token = authHeader.replace('Bearer ', '')

        jwt.verify(token,'secretKey', function(err, token) {
            if (err) {
                console.log('invalid token')
                res.status(401)
                res.send({message: 'Unauthorized'})            
            } else {
                whereObject = {
                    id: req.params.id
                }
                if (token.role !='administrador') {
                    whereObject.area = token.area;
                }
                clienteModel.findOne({whereObject}).then(resp => {
                    res.send(resp)
                })
           }
    });
}

    app.delete('/clientes/:id',function (req,res) {
        const authHeader = req.headers['authorization'];
        token = authHeader.replace('Bearer ', '')

        jwt.verify(token,'secretKey', function(err, token) {
            if (err) {
                console.log('invalid token')

                res.status(401)
                res.send({message: 'Unauthorized'})
            } else {
                if (token.role == 'administrador') {
                clienteModel.findOne({
                    where:{
                        id:req.params.id,
                        area:token.area
                    }
                }).then(resp => {
                    console.log(resp)
                    if (resp) {
                        clienteModel.destroy({
                            where:{
                                id:req.params.id,
                                area:token.area
                            }
                        }).then(resp => {
                            res.send({message:'cliente eliminado'})
                        })
                    } else {
                        res.status(401)
                        res.send({message: 'cliente no existe'})
                    }
                });
            } else {
                res.status(401)
                res.send({message: 'Unauthorized'})
            }
        }
     });
  })
}
