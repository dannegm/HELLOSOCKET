'use strict';

const { errors } = require ('../utils');
const { UserSchema } = require ('../schemas');

class UserModel {
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
    }
    async update () {

    }
    async delete () {
        // TODO: Soft delete
    }

    async upsert (user) {
        const query = { $or: [
            {
                email: user.email,
            }
        ]};
        return await UserSchema.model.create (query, { $set: user }, {
            upsert: true,
        });
    }
}
module.exports = UserModel;