import mongoose from "mongoose";


const changepasswordSchema = new mongoose.Schema({
    newpassword: { type: String, required: true },
    confirmpassword: { type: String, required: true },
});

export const changepasswordModel = mongoose.model("changepassword", changepasswordSchema);