const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    const authHeader  = req.headers.autherization;
    if(!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(400).json({message:'No token provided'});
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({message:'Invalid or expired token'});
    }
};

module.exports =authenticate;
