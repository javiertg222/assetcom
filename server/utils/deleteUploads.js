const fs = require("fs");
const db = require("../database");
/**
 * Función para eliminar
 * @param {*} id 
 */

const deleteUploads = (id) => {
  db.get("SELECT image FROM asset WHERE id_asset = ?", id, (err, row) => {

    if(row.image){
    const arr = row.image.split("/");

    fs.unlink(`server/uploads/${arr[arr.length - 1]}`, function (err) {
      if (err) throw err;
      console.info("Image deleted!");
    });
  }
  });

};
module.exports = { deleteUploads };
