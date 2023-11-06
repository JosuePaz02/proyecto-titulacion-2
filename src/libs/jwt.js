const {TOKEN_SECRET} = require('../config.js')
const jwt = require('jsonwebtoken')

function createAcessToken (playload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            playload,
            TOKEN_SECRET,
            {
                expiresIn: '1m'
            },
            (err, token) => {
                if(err) reject(err)
                resolve(token)
            }
        )
    })
}

module.exports = {createAcessToken}