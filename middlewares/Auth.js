import User from "../models/User.js";
import CustomError from "../utilities/ErrorHelpers/CustomErrorHandler.js";
import jwt from 'jsonwebtoken';
const auth = async (req, res, next) =>{
    try{
        let token = req.cookies['token'];
        console.log("token = ", token)

        if(!token){
            console.log("1st error");

            return next(new CustomError('Unauthorized  Access!', 401));
        }

        try{
            console.log("secret key - ", process.env.SECRET_KEY);
            const validatedToken = await jwt.verify(token, process.env.SECRET_KEY);
            console.log("valid token =  ", validatedToken)
            const user = await User.findOne( { _id: validatedToken._id} );
            console.log("--------finding user ------");
            if(!user){
                console.log('2nd error')
                return next(new CustomError('Unauthorized  Access!', 401));
            }

            req.user = user;
            console.log("Logged in as :", user.name);

        }
        catch(err){
            console.log(err);

            return next(new CustomError('Unauthorized Access!', 401));
        }
        next();
    }
    catch(err){
        console.log("2nd catch", err);
        return next(new CustomError('Unauthorized Access!', 401));
    }
}

export default auth;