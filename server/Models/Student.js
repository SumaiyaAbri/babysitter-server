import mongoose from "mongoose";
const StudentSchema=mongoose.Schema({
    studId: {
        type:String,
        required:true,
    },studName: {
        type:String,
        required:true,
    },studrole: {
        type:String,
        required:true,
    },studusername: {
        type:String,
        required:true,
    },password: {
        type:String,
        required:true,
    },gender: {
        type:String,
        required:true,
    }

    

});
const StudentModel = mongoose.model("students",StudentSchema);
export default StudentModel;
