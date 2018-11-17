'use strict';

const mongoose = require ('mongoose');
const { Schema, model } = mongoose;

const baseSchemaDefinition = {
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
};

const createUniqueIndex = (options) => {
    const schema = new Schema (options.schemaDefinition, { collectionName: options.collectionName });
    schema.index (options.indexDefinition, { name: options.indexName, unique: true });
    return schema;
};

const createModel = (options) => {
    const createdModel = model (options.collectionName, { ...baseSchemaDefinition, ...options.schemaDefinition.obj });
    createdModel.ensureIndexes ();
    return createdModel;
};

module.exports = {
    createUniqueIndex,
    createModel,
};