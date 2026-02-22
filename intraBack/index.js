const express = require('express');
const cors = require('cors');

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

// Endpoint for creating a new event
app.post('/nuevo_evento', (req, res) => {
    console.log('--- Nuevo evento ---');
    console.log(req.body);
    console.log('-------------------------------');
    res.json({ message: 'Event created successfully', data: req.body });
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
