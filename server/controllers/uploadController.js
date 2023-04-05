//Middleware para subir archivos
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("hola")
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.filename + "-" + Date.now());
  },
});
const upload = multer({ storage: storage }).single('image');

module.exports = {upload};