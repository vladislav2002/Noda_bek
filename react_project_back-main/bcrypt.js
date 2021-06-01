const bcrypt = require('bcrypt');
const saltRounds = 10;

function passwordHash(password) {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function passwordCompare(current, hash) {
    return bcrypt.compareSync(current, hash)
}

module.exports = { passwordHash, passwordCompare }