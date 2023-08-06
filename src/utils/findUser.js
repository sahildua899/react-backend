const Users = require("../models/users.mongo");



// Finding User By Email
async function findUserByEmail(email) {
    const User = await Users.findOne({email:email});
    return User
}
// Finding User By ID
async function findUserById(id) {
    const User = await Users.findOne({_id:id});
    return User
}

// Find User By Phone
async function findUserByPhone(phone) {
    const User = await Users.findOne({phone:phone})
    return User
}


module.exports = {findUserByEmail, findUserById, findUserByPhone}