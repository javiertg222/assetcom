//Servidor
const express = require("express");
//Módulo para evitar Access-Control-Allow-Origin
const cors = require("cors");
//Módulo para las variables de entorno
require("dotenv").config();
const upload = require("./controllers/uploadController");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
} = require("./controllers/userController");
const {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
} = require("./controllers/assetController");

//const auth = require("./middlewares/auth");

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

//ASSET ENDPOINTS
/**
 * Crear un activo
 */

app.post("/api/asset", upload.upload, function (req, res, next) {
  createAsset(req, res);
});
/**
 * Listar un activo por id
 */
app.get("/api/asset/:id", function (req, res, next) {
  getAsset(req, res);
});
/**
 * Modificar un activo
 */
app.put("/api/asset/update/:id", function (req, res, next) {
  updateAsset(req, res);
});
/**
 * Listar todos los activos
 */
app.get("/api/assets", (req, res, next) => {
  getAssets(req, res);
});
app.delete("/api/asset/delete/:id", function (req, res, next) {
  deleteAsset(req, res);
});

//USER ENDPOINTS

/**
 * Listar todos los usuarios
 */

app.get("/api/users", (req, res, next) => {
  getUsers(req, res);
});
/**
 * Listar un usuario por id
 */
app.get("/api/user/:id", (req, res, next) => {
  getUser(req, res);
});

/**
 * Insertar usuarios
 */

app.post("/api/user", (req, res) => {
  createUser(req, res);
});

/**
 * Modificar usuarios
 */

app.put("/api/user/update/:id", (req, res, next) => {
  updateUser(req, res, next);
});

/**
 * Borrar usuarios
 */
app.delete("/api/user/delete/:id", (req, res, next) => {
  deleteUser(req, res);
});

/**
 * Cambiar la contraseña
 */
app.post("/api/changePassword", (req, res, next) => {
  changePassword(req, res);
});

/**
 * Iniciar el servidor
 */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
