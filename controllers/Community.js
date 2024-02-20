import Community from "../models/Community.js";
import CustomError from "../utilities/ErrorHelpers/CustomErrorHandler.js"
import { v4 as uuidv4 } from 'uuid';
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
            message:"Community is created",
            content:{
                data: community
            }
        })
    }
    catch(err){
        next(new CustomError('Cannot create community', 500));
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
        next(new CustomError('Cannot fetch communities', 500));
    }
}