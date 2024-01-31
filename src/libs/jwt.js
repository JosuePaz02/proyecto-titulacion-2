const {TOKEN_SECRET} = require('../config.js')
const jwt = require('jsonwebtoken')

const createAcessToken = (playload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            playload,
            TOKEN_SECRET,
            {
                expiresIn: '300s'
            },
            (err, token) => {
                if(err) reject(err)
                resolve(token)
            }
        )
    })


}

module.exports = {createAcessToken}