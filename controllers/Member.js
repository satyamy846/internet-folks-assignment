import Community from "../models/Community.js";
import Member from "../models/Member.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
import CustomError from "../utilities/ErrorHelpers/CustomErrorHandler.js"

export const addMember = async(req, res,next) =>{
    try{
        const communityId = req.body.community;
        const userId = req.user._id;
        const roleId = req.body.role;
        
        const user = await User.findOne({_id: userId});
        
        if(!user){
            return next(new CustomError('User could not be found', 404));
        }

        const community = await Community.findOne({_id: communityId});

        if(!community){
            return next(new CustomError('Community could not be found', 404));
        }

        const role = await Role.findOne({_id: roleId});
        if(!role){
            return next(new CustomError('Role could not be found', 404));

        }

        //Check if the role is admin then
        if(role.name.toLowerCase() !== 'community admin'){
            return next(new CustomError('NOT_ALLOWED_ACCESS', 402));
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
        next(new CustomError(`Couldn't add member`, 500));
    }
}

export const removeMember = async(req, res,next) =>{
    try{
        const memberId = req.params.id;
        const member = await Member.findOne({_id: memberId});

        if(!member){
            return next(new CustomError('Member could not be found', 404));
        }

        // Only community Admin and community moderator can 
        // remove member for other roles will throw error - NOT_ALLOWED_ACCESS

        await Member.findOneAndRemove({_id: memberId});

        res.status(200).json({
            status: true,
        });
    }
    catch(err){
        next(new CustomError(`Couldn't add member`, 500));
    }
}