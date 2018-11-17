'use strict';

const mongo = {
    UNEXPECTED: {
        code: 'MONGO_UNEXPECTED',
        message: 'Unexpeted erro with MongoDB',
    }
};

const users = {
    REGISTERED: {
        code: 'USER_REGISTERED',
        message: 'The user is already exists',
    }
};

module.exports = {
    mongo,
    users,
};