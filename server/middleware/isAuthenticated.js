require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env
//grabs the secret from the .env file

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
            //if there isn't a valid headerToken then it returns error code 401 for unauthorized
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
            //creates a secret token with valid headerToken and the secret in the .env
        } catch (err) {
            err.statusCode = 500
            throw err
            //if this fails it returns an error
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
            //if there isn't a valid secret token from the previous step for any reason to will return an error
        }

        next()
        //if everything passes without an error it calls the next function.
    }
}