const jwt = require('jwt-simple')
const moment = require('moment')
/**
 * Crea un token a raíz del id del usuario
 * @param {*} user 
 */
function createToken (user){

    const payload = {
        sub:user.id_user,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }
return jwt.encode(payload, process.env.SECRET_TOKEN)

}

module.exports = createToken