const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors')
require('./db.js');

const server = express();

server.name = 'API';


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
const origins = ["https://client-unse-project.vercel.app","http://localhost:5173", "https://fp17v6p5-5173.brs.devtunnels.ms"]
server.use(cors({
  origin: origins[1],
  credentials: true,
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  exposedHeaders: ['Content-Length', 'Content-Type', 'Cache-Control', 'Last-Modified', 'ETag', 'Authorization', 'Location', 'Set-Cookie', 'X-Requested-With', 'Access-Control-Allow-Origin']

}));


 
 server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
