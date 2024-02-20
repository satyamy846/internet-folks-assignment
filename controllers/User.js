import User from '../models/User.js';
import CustomError from '../utilities/ErrorHelpers/CustomErrorHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signupUser = async (req, res, next) =>{
    try{
        
        const {
            name,
            email,
            password,
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        if(!user){
            return next(new CustomError("Somethig went wrong", 500));
        }

        const payload = {
            _id: user._id,
            email: user.email
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'});

        res.cookie('token', token, {httpOnly: true, secure: true})
        .status(200).json({
            message: "User is created",
            status: true,
            content:{
            data:{
                id: user._id,
                name: user.name,
                email: user.email,
                created_at: user.createdAt
            },
            meta:{
                access_token: token
            }
            }
        })
    }
    catch(error){
        next(new CustomError('Cannot add user', 500));
    }
}

export const loginUser = async (req, res, next) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email: email});

        if(!user){
            return next(new CustomError('User not found', 404));
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword){
            return next(new CustomError('Bad Credentials', 402));
        }
        const payload = {
            _id: user._id,
            email: user.email
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'});

        res.cookie("token", token, {httpOnly: true, secure:true})
        .status(200).json({
            message: 'Logged in',
            status: true,
            content: {
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    created_at: user.createdAt
                },
                meta: {
                    access_token: token
                }
            }
        })

    }
    catch(err){
        // console.log(err);
        next(new CustomError('Cannot login a user', 500));
    }
}


export const getCurrentUser = async(req, res, next) =>{
    try{
        const userId = req.user._id;

        const user = await User.findOne({ _id: userId});
        if(!user){
            return next(new CustomError('User not found', 404));
        }

        res.status(200).json({
            status: true,
            content:{
                data:{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    created_at: user.createdAt
                }
            }
        })
    }
    catch(err){
        next(new CustomError('Cannot get the current user', 500));
    }
}