const bcrypt = require('bcryptjs');


// Hashing Password
async function hashPass(password) {
    const newPass = bcrypt.hash(password, 12);
    return newPass
}


module.exports = {hashPass}