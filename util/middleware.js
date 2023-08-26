const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

export const verifyToken = async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(':')[1]
    }
    if(!token){
        res.status(403).json({message:"token not found"})
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRETE)
        const user = await User.findOne(decode.id)
        if(!user){
            res.status(403).json({message:"user not found"})
        }
        req.user = user
        return next()
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}