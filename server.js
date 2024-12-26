const path = require('path');
const http = require('http');
const fs = require('fs');
const url = require('url');
 
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
 
  // Ruta para devolver el JSON de relojes
  if (req.method === 'GET' && parsedUrl.pathname === '/public/relojes') {
    fs.readFile(path.join(__dirname, 'data', 'relojes.json'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'No se pudo cargar el catálogo' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  }
  // Ruta para servir cualquier archivo dentro de la carpeta "public"
  else {
    const publicDir = path.join(__dirname, 'public');
    const filePath = path.join(
      publicDir,
      parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname
    );
 
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Archivo no encontrado');
      }
 
      const ext = path.extname(filePath).toLowerCase();
      const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
      }[ext] || 'text/plain';
 
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }
});
 
server.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});