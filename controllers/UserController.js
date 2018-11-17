'use strict';

const { errors } = require ('../utils');
const { UserSchema } = require ('../schemas');

class UserController {
    async find (query) {

    }

    async show (id) {

    }

    async store () {

    }

    async update () {

    }

    async delete () {

    }

    // TODO: Actualizar permisos
    async grant (user_id, rol) {

    }

    // TODO: Validar usuario por email
    async validate (user, validate_token) {

    }
}

module.exports = UserController;