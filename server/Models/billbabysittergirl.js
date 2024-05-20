import mongoose from "mongoose";
 
const BillBabysitterGirlSchema = new mongoose.Schema({
    babysitterid: {
        type: String,
        required: true,
    },
    babysitterName: {
        type: String,
        required: true,
    },
    babysitterAge: {
        type: Number,
        required: true,
    },
    babysitterPrice: {
        type: Number,
        required: true,
    },
    babysitterPlace: {
        type: String,
        required: true,
    },
    babysitterHouseno: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    cardNo: {
        type: String,
        required: false,
    },
    cardDay: {
        type: String,
        required: false,
    },
    cardCVV: {
        type: String,
        required: false,
    }, 
    customerforbabysitterName: {
        type: String,
        required: false,
    },
    customerforbabysitterPhone: {
        type: String,
        required: false,
    }

});

const BillBabysitterGirl  = mongoose.model("BillBabysitterGirl", BillBabysitterGirlSchema);

export default BillBabysitterGirl ;
