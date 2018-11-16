'use strict';

module.exports = (app) => {
    require ('./login') (app);
    require ('./users') (app);
};