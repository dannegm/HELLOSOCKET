'use strict';

const { errors } = require ('../utils');
const { UserSchema } = require ('../schemas');

const UserModel = {
    async create (user) {
        try {
            const registered_user = await UserSchema.model.findOne (
                { $or: [
                    {
                        email: user.email,
                    }
                ]}
            );

            if (!!registered_user) throw errors.users.REGISTERED;
            return await UserSchema.model.create (user);
        } catch (e) {
            throw e || errors.mongo.UNEXPECTED;
        }
    },

    async verify ({ username, password }) {
        return await UserSchema.model.find({
            email: username,
            'credentials.password': password
        })
    },

    async update () {

    },

    async delete () {

    },

    async upsert ($set) {
        const query = { $or: [
            {
                email: $set.email,
            }
        ]};
        return await UserSchema.model.findOneAndUpdate (query, { $set }, {
            upsert: true,
        });
    },
}
module.exports = UserModel;