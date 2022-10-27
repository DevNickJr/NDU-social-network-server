const bcrypt = require('bcrypt')
const SALT = Number(process.env.SALT)

const hashPassword = async (password) => {
    console.log(typeof SALT, "salt")
    const hash = await bcrypt.hash(password, SALT);
    return hash
}

module.exports = hashPassword;