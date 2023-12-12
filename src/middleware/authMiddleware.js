const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user){
        if(err){
            return res.status(404).json({
                message : 'The authentication failed',
                status : 'ERROR'
            })
        }
        const { payload } = user
        if(payload?.isAdmin == true){
            next()
        }
        else {
            return res.status(404).json({
                message : 'You not have permission',
                status : 'ERROR'
            })
        }
        
    })
}

module.exports = {
    authMiddleware
}