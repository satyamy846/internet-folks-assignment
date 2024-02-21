import Community from "../models/Community.js";
import CustomError from "../utilities/ErrorHelpers/CustomErrorHandler.js";
import Member from '../models/Member.js';
import { v4 as uuidv4 } from 'uuid';
import ERROR_MESSAGE from "../constants/ErrorMessages.js";
import STATUS_CODE from "../constants/StatusCode.js";

export const createCommunity = async(req, res, next) =>{
    try{
        const name = req.body.name;
        const userId = req.user._id;
        const community = await Community.create({
            name: name,
            slug: uuidv4(),
            owner: userId
        })

        res.status(200).json({
            status: true,
            content:{
                data: community
            }
        })
    }
    catch(err){
        next(new CustomError(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, STATUS_CODE.SERVER_ERROR));
    }
}

export const getAllCommunities = async(req, res, next) =>{
    try{
       const communities = await Community.find({});

       res.status(200).json({
        content:{
            meta:{
                total: communities.length,
                pages:  Math.ceil(communities.length / 10), // this should be changed
                page : 1, // this should be changed
            },
            data: communities
        }
       })
    }
    catch(err){
        next(new CustomError(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, STATUS_CODE.SERVER_ERROR));
    }
}

export const getAllMembers = async(req, res, next) =>{
    try{
        const communityId = req.params.id;

        const members = await Member.find({community: communityId}).populate({
            path:"user",
            select:"_id name"
        }).populate({
            path: "role",
            select:"_id name"
        })

        if(members.length < 1){
            return next(new CustomError(`Members ${ERROR_MESSAGE.NOT_FOUND}`), STATUS_CODE.NOT_FOUND);
        }

        res.status(200).json({
            status: true,
            content:{
                metat:{
                    total: members.length,
                    // pages:10,
                    // page: 1,
                }
            },
            data: members
        })
    }
    catch(err){
        console.log(err);
    }
}

export const getMyOwnedCommunity = async(req, res, next) =>{
    try{
            const userId = req.user._id;
            // I don't understand how it is working fine
            // const community = await Community({owner: userId});

            const community = await Community.find({owner: userId});

            if(!community){
                return next(new CustomError(`Community ${ERROR_MESSAGE.NOT_FOUND}`, STATUS_CODE.NOT_FOUND));
            }

            res.status(200).json({
                status: true,
                content:{
                    meta:{
                        total: community.length,
                        // pages: 10,
                        // page: 1,
                    }
                },
                data: community
            })
        }
    catch(err){
        console.log(err);
        next(new CustomError(`${ERROR_MESSAGE.INTERNAL_SERVER_ERROR}`, STATUS_CODE.SERVER_ERROR));
    }
}


export const getMyJoinedCommunity = async(req, res, next) =>{
    try{
        const communities = await Community.find({}).populate({
            path: "owner",
            select: "_id name"
        });

        res.status(200).json({
            status: true,
            content:{
                meta:{
                    total: communities.length,
                    // pages: 1,
                    // page: 1,
                }
            },
            data: communities
        });
    }
    catch(err){
        console.log(err)
        next(new CustomError(`${ERROR_MESSAGE.INTERNAL_SERVER_ERROR}`, STATUS_CODE.SERVER_ERROR));
    }
}

