require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Content received logger route
app.post('/api/log', (req, res) => {
    console.log('--- Data Received from Frontend ---');
    console.log(req.body);
    console.log('-----------------------------------');
    res.json({ message: 'Data received successfully', data: req.body });
});

// Get events for a date range: GET /eventos?start=YYYY-MM-DD&end=YYYY-MM-DD
app.get('/eventos', async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).json({ message: 'Se requieren los parámetros start y end' });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            'SELECT * FROM events WHERE date BETWEEN ? AND ? ORDER BY date, time',
            [start, end]
        );
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener eventos:', err);
        res.status(500).json({ message: 'Error fetching events', error: err.message });
    } finally {
        if (conn) conn.release();
    }
});



// Endpoint for creating a new event - saves to DB
app.post('/nuevo_evento', async (req, res) => {
    const { title, date, time, description, priority, creator_id } = req.body;

    console.log('--- Nuevo evento recibido ---');
    console.log(req.body);

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'INSERT INTO events (title, date, time, description, priority, creator_id) VALUES (?, ?, ?, ?, ?, ?)',
            [title, date, time, description, priority, creator_id ?? 1]
        );
        console.log(`Evento guardado en BD con ID: ${result.insertId}`);
        console.log('-------------------------------');
        res.json({ message: 'Event saved successfully', insertId: Number(result.insertId) });
    } catch (err) {
        console.error('Error al guardar evento en BD:', err);
        res.status(500).json({ message: 'Error saving event', error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

// Endpoint for creating a new event
app.post('/editar_evento', (req, res) => {
    console.log('--- Evento editado ---');
    console.log(req.body);
    console.log('-------------------------------');
    res.json({ message: 'Event created successfully', data: req.body });
});

// Endpoint for sending a new message
app.post('/nuevo_mensaje', (req, res) => {
    console.log('--- Nuevo Mensaje ---');
    console.log(req.body);
    console.log('---------------------');
    res.json({ message: 'Message sent successfully', data: req.body });
});

// Endpoint for direct messages from Inbox
app.post('/mensaje_directo', (req, res) => {
    console.log('--- Mensaje Directo ---');
    console.log(req.body);
    console.log('-----------------------');
    res.json({ message: 'Direct message sent successfully', data: req.body });
});
// Endpoint for sending a new message
app.post('/nueva_noticia', (req, res) => {
    console.log('--- Nueva noticia ---');
    console.log(req.body);
    console.log('---------------------');
    res.json({ message: 'Message sent successfully', data: req.body });
});

app.get('/', (req, res) => {
    res.send('--- En Desarrollo ---');
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
