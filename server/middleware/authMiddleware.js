const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    const authHeader  = req.headers.autherization;
    if(!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(400).json({message:'No token provided'});
}