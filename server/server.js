//Servidor
const express = require("express");
//Módulo para evitar Access-Control-Allow-Origin
const cors = require("cors");
//Módulo para las variables de entorno
require("dotenv").config();
//Middleware para subir imágenes al servidor
const { upload } = require("./controllers/uploadController");
//Controladores para los usuarios
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
} = require("./controllers/userController");
//Controladores para los assets
const {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
} = require("./controllers/assetController");

//Controlador para las estadísticas
const { getEstadisticas } = require("./controllers/estadisticasController");
//Controlador Backup
const { backupController } = require("./controllers/backupController");
//Controlador para la configuración
const { createSetting, getSetting, updateSetting } = require("./controllers/settingsController");

//const auth = require("./middlewares/auth");
//Variable de entorno (puerto de escucha del servidor)
const PORT = process.env.PORT;
//Servidor express
const app = express();
//Previene la inyección de código malicioso
app.use(cors());
app.use(express.json());
//Mapear las rutas de las imágenes subidas a express
app.use("/public", express.static(`${__dirname}/uploads`));
//ASSET ENDPOINTS
/**
 * Crear un activo
 */

app.post("/api/asset", upload, function (req, res, next) {
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
app.put("/api/asset/update/:id", upload, function (req, res, next) {
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

//SETTINGS ENDPOINTS
/**
 * Obtener datos configuración
 */
app.get("/api/settings", function (req, res, next) {
  getSetting(req, res);
});

/**
 * Añadir Configuración
 */
app.post("/api/setting", upload, function (req, res, next) {
  createSetting(req, res);
});
/**
 * Modificar usuarios
 */

app.put("/api/setting/update/:id", upload, function (req, res, next) {
  updateSetting(req, res, next);
});

//MISCELLANEOUS ENDPOINTS

/**
 * Cambiar la contraseña
 */
app.post("/api/changePassword", (req, res, next) => {
  changePassword(req, res);
});
/**
 * Estadísticas
 */
app.get("/api/estadisticas", (req, res, next) => {
  getEstadisticas(req, res);
});
/**
 * Backups
 */
app.get("/api/backup", (req, res, next) => {
  backupController(req, res);
});


/**
 * INICIAR EL SERVIDOR
 */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
