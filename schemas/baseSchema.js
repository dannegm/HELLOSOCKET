'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const baseSchemaDefinition = {
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
};

const createUniqueIndex = (options) => {
    const schema = new Schema (options.schemaDefinition, { collectionName: options.collectionName });
    const baseConstrains = { name: options.indexName, unique: true };
    const indexConstrains = additionalConstrains ? { ...baseConstrains, ...additionalConstrains } : baseConstrains;
    schema.index (options.indexDefinition, indexConstrains);
    return schema;
}

const createModel = (options) => {
    const model = model (options.collectionName, { ...baseSchemaDefinition, ...options.schemaDefinition });
    model.ensureIndexes ();
    return model;
}

module.exports = {
    createUniqueIndex,
    createModel,
};