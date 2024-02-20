import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    email:{
        type: String,
        unique:[true, 'Email must be unique']
    },
    password:{
        type: String,

    },
}, {timestamps: true});

const User = new mongoose.model("user", userSchema);

export default User;