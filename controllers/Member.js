import ERROR_MESSAGE from "../constants/ErrorMessages.js";
import STATUS_CODE from "../constants/StatusCode.js";
import Community from "../models/Community.js";
import Member from "../models/Member.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
import CustomError from "../utilities/ErrorHelpers/CustomErrorHandler.js"

export const addMember = async(req, res,next) =>{
    try{
        console.log("Req - ", req.user)
        const communityId = req.body.community;
        const userId = req.user._id;
        const roleId = req.body.role;
        
        const user = await User.findOne({_id: userId});
        if(!user){
            return next(new CustomError(`User ${ERROR_MESSAGE.NOT_FOUND}`, STATUS_CODE.NOT_FOUND));
        }

        const community = await Community.findOne({_id: communityId});

        if(!community){
            return next(new CustomError(`Community ${ERROR_MESSAGE.NOT_FOUND}`, STATUS_CODE.NOT_FOUND));
        }

        const role = await Role.findOne({_id: roleId});
        if(!role){
            return next(new CustomError(`Role ${ERROR_MESSAGE.NOT_FOUND}`, STATUS_CODE.NOT_FOUND));
        }

        //Check if the role is admin then
        if(role.name.toLowerCase() !== 'community admin'){
            return next(new CustomError(ERROR_MESSAGE.ACCESS_DENIED, STATUS_CODE.UNAUTHORIZED));
        }


        const member = await Member.create({
            community: communityId,
            user: userId,
            role: roleId
        });

        res.status(200).json({
            status: true,
            content:{
                data: member
            }
        })
    }
    catch(err){
        console.log(err);
        next(new CustomError(`${ERROR_MESSAGE.INTERNAL_SERVER_ERROR}`, STATUS_CODE.SERVER_ERROR));
    }
}

export const removeMember = async(req, res,next) =>{
    try{
        const memberId = req.params.id;
        const member = await Member.findOne({_id: memberId});
        const user = await User.findOne({_id: userId});

        if(!member){
            return next(new CustomError(`Member ${ERROR_MESSAGE.NOT_FOUND}`, STATUS_CODE.NOT_FOUND));
        }

        // Only community Admin and community moderator can 
        // remove member for other roles will throw error - NOT_ALLOWED_ACCESS
        
        await Member.findOneAndRemove({_id: memberId});

        res.status(200).json({
            status: true,
        });
    }
    catch(err){
        next(new CustomError(`${ERROR_MESSAGE.INTERNAL_SERVER_ERROR}`, STATUS_CODE.SERVER_ERROR));
    }
}