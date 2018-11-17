'use strict';

const { errors } = require ('../utils');
const { UserSchema } = require ('../schemas');

const  UserController = {
    async find (req, res) {
        const query = req.query.q || {};
        const users = await UserSchema.model.find(query);

        res
            .status (200)
            .json ({
                data: users,
            })
        ;
    },

    async show (req, res) {
        const _id = req.param.id;
        const user = await UserSchema.model.find({ _id });
        res
            .status (200)
            .json ({
                data: user,
            })
        ;
    },

    async store (req, res) {
        res
            .status (201)
            .json ({
                data: null,
            })
        ;
    },

    async update (req, res) {
        res
            .status (200)
            .json ({
                data: null,
            })
        ;
    },

    async delete (req, res) {
        res.status (204);
    },

    // TODO: Actualizar permisos
    async grant (req, res) {
        res.status (401);
    },

    // TODO: Validar usuario por email
    async validate (req, res) {
        res.status (401);
    },
}
module.exports = UserController;