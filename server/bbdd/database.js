const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(process.env.DATABASE_FILE, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  } else {
    console.log("Connected to the SQLite database.");
  }
});

module.exports = db;
