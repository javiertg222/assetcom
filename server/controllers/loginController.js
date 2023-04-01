const createJWT = require('../utils-server/createJWT');

/**
 * Este controlador es el encargado de logear a un usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginController = async (req, res) => {
    try{

      createJWT(user)
      req = matchedData(req);
      const user = await usersModel.findOne({email:req.email})
  
      if(!user){
        handleHttpError(res, "USER_NOT_EXISTS", 404);
        return
      }
  
      const hashPassword = user.get('password');
  
      const check = await compare(req.password, hashPassword)
  
      if(!check){
        handleHttpError(res, "PASSWORD_INVALID", 401);
        return
      }
  
      user.set('password', undefined, {strict:false})
      const data = {
        token: await tokenSign(user),
        user
      }

      res.send({data})
  
  
    }catch(e){
      console.log(e)
      
    }
  }

  module.exports = { loginController };