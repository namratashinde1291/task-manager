const {validationResult } = require('express-validator');
const { findUserByEmail, createUser } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register =  async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status('400').json({errors:errors.array()})
        const {name, email, password} = req.body;

    try{
        const existingUser = await findUserByEmail(email);
        if (existingUser)
            return res.status(400).json({message:'email already exists'});
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await createUser({name,email,password:hashedPassword});
        return res.status(201).json({user:newUser});
    }catch(err){
        return res.status(500).json({message:'server error'});
    }
};

const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await findUserByEmail(email);
        if(!user)
            return res.status(400).json({message:"Invalid email or password"});
        const match = await bcrypt.compare(password,user.password);
        if(!match)
            return res.status(400).json({message:"Invalid email or password"});
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1h'});
        return res.json({token,user:{id:user.id, name:user.name, email:user.email} });

    }
    catch(err){
        return res.status(500).json({message:'server error'});
    }
};

module.exports ={register, login};