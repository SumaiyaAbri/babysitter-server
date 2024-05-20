import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
        required: true,
    }
});

const UserProfileModel = mongoose.model("userprofiles", UserProfileSchema);

export default UserProfileModel;
