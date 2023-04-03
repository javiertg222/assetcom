const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(process.env.DATABASE_FILE, (error) => {
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
  }
});

module.exports = db;
