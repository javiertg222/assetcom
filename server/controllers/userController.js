const db = require("../bbdd/database");
const bcrypt = require("../services/bcryptService");
/**
 * Obtener todos los usuarios
 * @param {*} req
 * @param {*} res
 */
async function getUsers(req, res) {
  const sql =
    "SELECT id_user,name_user,nickname_user,email_user,password_user,address_user, ciudad_user,prov_user,pais_user,name_rol,fecha FROM user INNER JOIN rol ON user.id_rol=rol.id_rol;";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
}
/**
 * Obtener un usuario por id
 * @param {*} req
 * @param {*} res
 * @param {*} id
 */
async function getUser(req, res, id) {
  const sql = "SELECT * FROM user WHERE id_user = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
}
/**
 * Crear un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function createUser(req, res) {
  const errors = [];
  if (!req.body.onename) {
    errors.push("Nombre no especificado");
  }
  if (!req.body.nick) {
    errors.push("Apodo no especificado");
  }
  if (!req.body.email) {
    errors.push("Email no especificado");
  }
  if (!req.body.password) {
    errors.push("Password no especificado");
  }
  if (!req.body.address) {
    errors.push("Dirección no especificado");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }

  const sql = `INSERT INTO user(name_user,nickname_user,email_user,password_user,address_user,ciudad_user,prov_user,pais_user,id_rol,fecha)
  VALUES($onename,$nickname,$email,$password,$address, $ciudad,$provincia,$pais,(SELECT id_rol FROM rol WHERE name_rol=$rol), datetime('now'))`;
  let data = {
    $onename: req.body.onename,
    $nickname: req.body.nick,
    $email: req.body.email,
    $password: await bcrypt.encrypt(req.body.password),
    $address: req.body.address,
    $ciudad: req.body.ciudad,
    $provincia: req.body.provincia,
    $pais: req.body.pais,
    $rol: req.body.rol,
  };
  const stm = db.prepare(sql, (error) => {
    if (error) {
      throw new Error(error.message);
    }
  });

  stm.run(data, (error) => {
    if (error) {
      throw new Error(error.message);
    } else {
      res.json({
        message: "success",
        data: data,
      });
    }
  });
  stm.finalize();
}

async function updateUser(req, res) {
  const id = Number(req.params.id);
  let sql = `UPDATE user SET name_user=$onename,nickname_user=$nickname,email_user=$email,
  address_user=$address,ciudad_user=$ciudad,prov_user=$provincia,pais_user=$pais,id_rol=(SELECT id_rol FROM rol WHERE name_rol =$rol),fecha=datetime('now') WHERE id_user=${id}`;

  let data = {
    $onename: req.body.onename,
    $nickname: req.body.nick,
    $email: req.body.email,
    $address: req.body.address,
    $ciudad: req.body.ciudad,
    $provincia: req.body.provincia,
    $pais: req.body.pais,
    $rol: req.body.rol,
  };
  const stm = db.prepare(sql, (error) => {
    if (error) {
      throw new Error(error.message);
    }
  });

  stm.run(data, (error) => {
    if (error) {
      throw new Error(error.message);
    } else {
      res.json({
        message: "success",
        data: data,
      });
    }
  });
  stm.finalize();
}

async function deleteUser(req, res) {
  const id = Number(req.params.id);
  let sql = `DELETE FROM user WHERE id_user=${id}`;
  const stm = db.prepare(sql, (error) => {
    if (error) {
      throw new Error(error.message);
    }
  });

  stm.run((error) => {
    if (error) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", data: req.params });
  });
  stm.finalize();
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
