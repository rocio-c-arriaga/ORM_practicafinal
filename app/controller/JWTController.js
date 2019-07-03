var jwt = require('jsonwebtoken');

module.exports = (app, userModel) => {
    app.post('/generate/token', function(req,res){ 
        userModel.findOne({
            where: {
                usuario: req.body.usuario,
                contraseña: req.body.contraseña
            }
        }).then((resp) => {

            if (!resp) {
                res.send({message: "usuario o contraseña son incorrectos"})
            } else {

                claimUser = {
                    id: resp.id,
                    nombre: resp.nombre,
                    role: resp.role,
                    area:resp.area
                }

                const token = jwt.sign(claimUser, 'secretKey', { expiresIn: '1h' } );
                console.log(token)
                res.send(token)
            }
        });

    })
}