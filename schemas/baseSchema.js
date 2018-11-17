'use strict';

const mongoose = require ('mongoose');
const { Schema } = mongoose;

const baseSchemaDefinition = {
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
};

const createUniqueIndex = (options) => {
    const schema = new Schema ({ ...baseSchemaDefinition, ...options.schemaDefinition }, { collectionName: options.collectionName });
    schema.index (options.indexDefinition, { name: options.indexName, unique: true });
    return schema;
};

const createModel = (options) => {
    const createdModel = mongoose.model (options.collectionName, options.schemaDefinition);
    createdModel.createIndexes ();
    return createdModel;
};

module.exports = {
    createUniqueIndex,
    createModel,
};