const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db = null;

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    const dbPath = path.join(__dirname, 'diagnostic.db');
    
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error al abrir base de datos:', err);
        reject(err);
      } else {
        console.log('Base de datos conectada');
        createTables();
        resolve();
      }
    });
  });
}

function createTables() {
  // Tabla de historial de diagnósticos
  db.run(`CREATE TABLE IF NOT EXISTS diagnostics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    dtc_count INTEGER DEFAULT 0,
    status TEXT NOT NULL,
    duration INTEGER,
    vehicle TEXT,
    data TEXT
  )`);

  // Tabla de códigos DTC leídos
  db.run(`CREATE TABLE IF NOT EXISTS dtc_readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    description TEXT,
    status TEXT,
    date TEXT NOT NULL,
    vehicle TEXT
  )`);

  // Tabla de datos de sensores
  db.run(`CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sensor_id TEXT NOT NULL,
    value REAL NOT NULL,
    timestamp TEXT NOT NULL,
    vehicle TEXT
  )`);
}

function getDatabase() {
  return db;
}

module.exports = {
  initializeDatabase,
  getDatabase
};
