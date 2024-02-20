import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    community: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'community',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true
    }
}, {timestamps: true});

const Member = new mongoose.model("member", memberSchema);

export default Member;