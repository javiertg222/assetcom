const bcrypt = require("../services/bcryptService");
/**
 * Función para saber si el password existe en la bbdd
 * @param {*} password 
 * @param {*} users 
 * @returns boolean 
 */
const findPassword = (password, users)=>{
    return users.find((user) => bcrypt.compare(password, user.password_user));
}

module.exports = {findPassword}