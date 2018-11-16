'use strict';

const { createModel, createUniqueIndex } = require ('./baseSchema');
const collectionName = 'user';

const schemaDefinition = {
    name: { type: String, required: true },
    email: { type: String, required: true },

    credentials: {
        password: String,
        accessToken: String,
    },

    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user',
    },
};

const schemaIndexed = createUniqueIndex ({
    collectionName,
    schemaDefinition,
    indexName: 'user_email_unique',
    indexDefinition: {
        email: 1,
    },
});

const model = createModel ({
    collectionName,
    schemaDefinition: schemaIndexed,
});

module.exports = {
    model,
};