const http = require('http');

const data = JSON.stringify({
    title: 'Evento de Prueba',
    date: '2026-03-10',
    time: '14:00',
    description: 'Descripcion de prueba para verificar la BD',
    priority: 1
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/nuevo_evento',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('Listo.');
    });
});

req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
});

req.write(data);
req.end();
