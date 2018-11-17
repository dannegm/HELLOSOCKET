'use strict';
require ('dotenv').config ();

let server = {
    hostname: process.env.HOSTNAME,
    port: process.env.PORT || 3000,
    secret: process.env.SECRET,
};

let mongo = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE,
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || '',
    options: {
        useNewUrlParser: true,              // New parser pass option
        autoIndex: false,                   // Don't build indexes
        reconnectTries: Number.MAX_VALUE,   // Never stop trying to reconnect
        reconnectInterval: 500,             // Reconnect every 500ms
        poolSize: 10,                       // Maintain up to 10 socket connections
        bufferMaxEntries: 0,                // If not connected, return errors immediately rather than waiting for reconnect
        keepAlive: 120,                     // Check TCP socket status every x milliseconds.
    },
};
mongo.auth = mongo.user != '' && mongo.password != '' ? `${mongo.user}:${mongo.password}@` : '';
mongo.schema = `mongodb://${mongo.auth}${mongo.host}:${mongo.port}/${mongo.database}`;

let credentials = {
    google: {
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    },
    mailgun: {
        API_KEY: process.env.MAILGUN_API_KEY,
        DOMAIN: process.env.MAILGUN_DOMAIN,
    },
};

module.exports = {
    server,
    mongo,
    credentials,
};