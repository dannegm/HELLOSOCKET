'use strict';

const { UserSchema } = require ('../schemas');

class UserModel {
  async constructor (user) {
    const _id = user._id;
    return this.user = await UserSchema.findOne ({ _id });
  }
}
module.exports = UserModel;