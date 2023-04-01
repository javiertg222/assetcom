BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "rol" (
	"id_rol"	INTEGER NOT NULL UNIQUE,
	"name_rol"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id_rol" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "user" (
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
);
CREATE TABLE IF NOT EXISTS "location" (
	"id_location"	INTEGER NOT NULL UNIQUE,
	"location"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id_location" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "status" (
	"id_status"	INTEGER NOT NULL UNIQUE,
	"status"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id_status" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "asset" (
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
);
COMMIT;
