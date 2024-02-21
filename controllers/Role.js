import Role from '../models/Role.js';
import CustomError from '../utilities/ErrorHelpers/CustomErrorHandler.js';

export const createRole = async (req, res, next) =>{
    try{
        const role = await Role.create(req.body);

        res.status(200).json({
            content:{
                data:role
            }
        })
    }
    catch(err){
        next(new CustomError('Cannot Create New Role', 500));
    }
}

export const getRoles = async(req, res, next) =>{
    try{
        const roles = await Role.find({});
        res.status(200).json({
            status: true,
            content:{
                meta:{
                    total:roles.length,
                    // pages:,
                    // page:
                },
            },
            data:roles
        })
    }
    catch(err){
        next(new CustomError('Cannot get roles', 500));
    }
}