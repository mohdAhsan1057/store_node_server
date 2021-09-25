const authJwt = require('../middlewares/middlewares/authJwt');
const roles = require('../middlewares/middlewares/rolesMiddleware');
module.exports = {
    authJwt,
    roles,
}