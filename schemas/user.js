'use strict';

const { createModel, createUniqueIndex } = require ('./baseSchema');
const collectionName = 'user';

const schemaDefinition = {
    status: {
        type: String,
        required: true,
        enum: ['registered', 'active', 'suspended'],
        default: 'registered',
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    photoUrl: String,

    credentials: {
        password: String,
        accessToken: String,
        validateToken: String,
    },

    role: {
        type: String,
        required: true,
        enum: ['super', 'admin', 'user'],
        default: 'user',
    },
};

const schemaIndexed = createUniqueIndex ({
    collectionName,
    schemaDefinition,
    indexName: 'user_credentials_unique',
    indexDefinition: {
        'email': 1,
        'credentials.accessToken': 1,
    },
});

const model = createModel ({
    collectionName,
    schemaDefinition: schemaIndexed,
});

module.exports = {
    model,
};