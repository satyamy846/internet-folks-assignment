import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    slug:{
        type: String,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true});

const Community = new mongoose.model("community", communitySchema);

export default Community;