const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(
  "./server/bbdd/db.sqlite3",
  (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    } else {
      console.log("Connected to the SQLite database.");
      //Crear la tabla rol
      db.run(
        `CREATE TABLE "rol" (
      "id_rol"	INTEGER NOT NULL UNIQUE,
      "name_rol"	TEXT NOT NULL UNIQUE,
      PRIMARY KEY("id_rol" AUTOINCREMENT)
    )`,
        (err) => {
          if (err) {
            // Tabla ya creada
          } else {
            // Insertamos los roles
            db.run(`INSERT INTO rol("name_rol") VALUES ('admin')`);
            db.run(`INSERT INTO rol("name_rol") VALUES ('user')`);
          }
        }
      );
      //Crear la tabla usuario
      db.run(`CREATE TABLE IF NOT EXISTS "user" (
      "id_user"	INTEGER NOT NULL UNIQUE,
      "name_user"	TEXT NOT NULL,
      "nickname_user"	TEXT NOT NULL,
      "email_user"	TEXT NOT NULL UNIQUE,
      "password_user"	TEXT NOT NULL,
      "address_user"	TEXT NOT NULL,
      "ciudad_user"	TEXT,
      "prov_user"	TEXT,
      "pais_user"	TEXT,
      "id_rol"	INTEGER NOT NULL,
      "fecha"	TEXT NOT NULL,
      PRIMARY KEY("id_user" AUTOINCREMENT),
      FOREIGN KEY("id_rol") REFERENCES "rol"("id_rol")
    )`);
      //Crear la tabla de las localizaciones
      db.run(
        `CREATE TABLE "location" (
      "id_location"	INTEGER NOT NULL UNIQUE,
      "location"	TEXT NOT NULL UNIQUE,
      PRIMARY KEY("id_location" AUTOINCREMENT)
    )`,
        (err) => {
          if (err) {
            // Tabla ya creada
          } else {
            // Insertamos las localizaciones
            db.run(`INSERT INTO location("location") VALUES ('Empresa')`);
            db.run(`INSERT INTO location("location") VALUES ('Cliente')`);
          }
        }
      );
      //Crear la tabla de los estados
      db.run(
        `CREATE TABLE "status" (
      "id_status"	INTEGER NOT NULL UNIQUE,
      "status"	TEXT NOT NULL UNIQUE,
      PRIMARY KEY("id_status" AUTOINCREMENT)
    )`,
        (err) => {
          if (err) {
            // Tabla ya creada
          } else {
            // Insertamos los estados
            db.run(`INSERT INTO status("status") VALUES ('Alta')`);
            db.run(`INSERT INTO status("status") VALUES ('Pendiente')`);
            db.run(`INSERT INTO status("status") VALUES ('Baja')`);
          }
        }
      );
      //Crear la tabla de los activos
      db.run(`CREATE TABLE IF NOT EXISTS "asset" (
      "id_asset"	INTEGER NOT NULL UNIQUE,
      "image"	TEXT,
      "name_asset"	TEXT NOT NULL,
      "serial_number"	TEXT NOT NULL UNIQUE,
      "id_status"	INTEGER NOT NULL,
      "id_location"	INTEGER NOT NULL,
      "fecha"	TEXT NOT NULL,
      PRIMARY KEY("id_asset" AUTOINCREMENT),
      FOREIGN KEY("id_location") REFERENCES "location"("id_location"),
      FOREIGN KEY("id_status") REFERENCES "status"("id_status")
    )`);
      //Crear la tabla para el contador de activos
      db.run(
        `CREATE TABLE IF NOT EXISTS "asset_counter" (
        "id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL UNIQUE,
        "cant"	INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT)
      )`
      );
      //Crear la tabla para el contador de usuarios
      db.run(
        `CREATE TABLE IF NOT EXISTS "user_counter" (
        "id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL UNIQUE,
        "cant"	INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT)
      )`
      );
      //Crear la tabla para la configuración personalizada

      db.run(
        `CREATE TABLE IF NOT EXISTS "config" (
        "id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT,
        "image"	TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
      )`
      );
      //CREAR LOS TRIGGERS
      db.run(`CREATE TRIGGER IF NOT EXISTS delete_asset AFTER DELETE ON asset
      BEGIN
      UPDATE asset_counter SET cant = cant-1 WHERE id = old.id_status;
      UPDATE sqlite_sequence SET seq = (SELECT MAX("id_asset") FROM asset) WHERE name="asset";
      END`);
      db.run(`CREATE TRIGGER IF NOT EXISTS delete_user AFTER DELETE ON user
      BEGIN
      UPDATE user_counter SET cant  = cant-1 WHERE id = 1;
      UPDATE sqlite_sequence SET seq = (SELECT MAX("id_user") FROM user) WHERE name="user";
      END`);
      db.run(`CREATE TRIGGER IF NOT EXISTS insert_asset AFTER INSERT ON asset
      BEGIN
      UPDATE asset_counter SET cant  = cant+1 WHERE id = new.id_status;
      END`);
      db.run(`CREATE TRIGGER IF NOT EXISTS insert_user AFTER INSERT ON user
      BEGIN
      UPDATE user_counter SET cant  = cant+1 WHERE id = 1;
      END`);
    }
  }
);

module.exports = db;
