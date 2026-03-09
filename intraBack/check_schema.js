require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

async function getSchema() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('DESCRIBE events');
        console.log('--- Schema de la tabla events ---');
        rows.forEach(row => console.log(row));
        console.log('---------------------------------');
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

getSchema();
