// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Cambia esto por tu usuario de MySQL
    password: '', // Cambia esto por tu contraseña de MySQL
    database: 'proyectflow',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;