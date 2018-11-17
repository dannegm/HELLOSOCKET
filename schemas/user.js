'use strict';

const { createModel, createUniqueIndex } = require ('./baseSchema');
const collectionName = 'user';

const schemaDefinition = {
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
        enum: ['super', 'admin', 'user'],
        default: 'user',
        required: true,
    },
    status: {
        type: String,
        enum: ['registered', 'active', 'suspended'],
        default: 'registered',
        required: true,
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