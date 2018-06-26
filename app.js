'use strict';
require ('colors');

const settings = require (`./config/settings`);
const
  express = require ('express'),
  mongoose = require ('mongoose'),
  winston = require ('winston'),
  session = require ('express-session'),
  bodyParser = require ('body-parser'),
  helmet = require ('helmet'),
  favicon = require ('serve-favicon');

//! Setup & expose
const app = module.exports = express ();
const server = require ('http').Server (app);
const io = require ('socket.io') (server);
const MongoStore = require ('connect-mongo') (session);

app.locals.hostname = settings.server.hostname;
mongoose.connect (settings.mongo.schema);

app
  .use (favicon ('./favicon.ico'))
  .use (helmet ())
  .use (bodyParser.json ())
  .use (bodyParser.urlencoded ({ extended: false }))
  .use (session ({
    store: new MongoStore ({
      mongooseConnection: mongoose.connection,
    }),
    secret: settings.server.secret,
    resave: true,
    saveUninitialized: true
  }));

//! Logger
const { log } = console;
const { highlight } = require ('cli-highlight');
app.logger = new winston.Logger ();
app.logger.configure ({
  transports: [
    new (winston.transports.Console) ({
      name: 'Console',
      timestamp: (new Date ()).toISOString (),
      colorize: true,
    }),
    new (winston.transports.File) ({
      name: 'File',
      filename: `${process.env.npm_package_name}.log`,
      timestamp: (new Date ()).toISOString (),
      json: false,
      formatter: (options) => {
        const message = options.message.replace (/(\u001B)|(\\u[0-9a-f]{0,4})|(\[[0-9a-z]{1,3})/gi, '');
        return `${options.timestamp} - [${options.level.toUpperCase ()}] ${message}`;
      },
    }),
  ],
});
app.outputs = {
  json (tag, code) {
    log (`[${tag}]`.magenta.bold);
    log (highlight (JSON.stringify (code, null, 2)));
  }
};

//! Routes
app.all ('*', (req, res, next) => {
  const methods = {
    'GET': req.method.blue.bold,
    'POST': req.method.green.bold,
    'PUT': req.method.yellow.bold,
    'DELETE': req.method.red.bold,
    'PATCH': req.method.cyan.bold,
  };
  app.logger.info (`${methods [req.method]} ${req.path}`);
  //app.outputs.json ('HEADERS', req.headers);
  app.outputs.json ('BODY', req.body);
  next ();
});
app.all ('/', (req, res) => {
  res.json ({
    method: req.method,
    message: 'Few steps to greatness.',
    body: req.body,
  });
});

//! Sockets
io.on ('connection', (socket) => {
  socket.emit ('connected', { message: `Welcome to ${process.env.npm_package_name}.` });
  socket.on ('message', (data) => {
    socket.emit ('message', data);
  });
});

//! Server
const deploy = () => {
  const schema = `http://${settings.server.hostname}:${settings.server.port}`;
  app.listen (settings.server.port);
  app.logger.info (`Listening on ${schema.yellow}`);
};

//! Expose port
if (!module.parent) {
  deploy ();
}