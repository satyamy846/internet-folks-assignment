import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
}, {timestamps: true});

const Role = new mongoose.model("role", roleSchema);

export default Role;