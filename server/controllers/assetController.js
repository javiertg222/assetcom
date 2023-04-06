const db = require("../database");

/**
 * Obtener todos los activos
 * @param {*} req
 * @param {*} res
 */
async function getAssets(req, res) {
  const sql =
    "SELECT id_asset, image, name_asset, serial_number, status, location, fecha FROM asset INNER JOIN status, location ON asset.id_status=status.id_status AND asset.id_location=location.id_location";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
}
/**
 * Obtener un activo por id
 * @param {*} req
 * @param {*} res
 * @param {*} id
 */
async function getAsset(req, res, id) {
  const sql = "SELECT * FROM asset WHERE id_asset = ?";
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
 * Crear un activo
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function createAsset(req, res) {
  const sql = `INSERT INTO asset(image,name_asset,serial_number,id_status,id_location,fecha)
  VALUES($image,$assetname,$serialnumber,(SELECT id_status FROM status WHERE status=$status),(SELECT id_location FROM location WHERE location=$location), datetime('now'))`;
  let data = {
    $assetname: req.body.assetname,
    $serialnumber: req.body.serialnumber,
    $status: req.body.status,
    $location: req.body.location,
    $image: req.body.image,
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

async function updateAsset(req, res) {
  const id = Number(req.params.id);
  let sql = `UPDATE asset SET image=$image, name_asset=$assetname,serial_number=$serialnumber,
  id_status=(SELECT id_status FROM status WHERE status =$status), id_status=(SELECT id_location FROM location WHERE location =$location),fecha=datetime('now') WHERE id_asset=${id}`;

  let data = {
    $image: req.body.image.name,
    $assetname: req.body.assetname,
    $serialnumber: req.body.serialnumber,
    $status: req.body.status,
    $location: req.body.location,
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

async function deleteAsset(req, res) {
  const id = Number(req.params.id);
  let sql = `DELETE FROM asset WHERE id_asset=${id}`;
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
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
};
