'use strict';

const { Schema, model } = require ('mongoose');
const collection = 'users';

const body = {
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

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
module.exports = model ('user', new Schema (body, { collection });