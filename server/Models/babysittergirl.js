import mongoose from "mongoose";

const babysitterSchema = mongoose.Schema({
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
    }
});

const BabysitterGirlModel = mongoose.model("BabysitterGirl", babysitterSchema);

export default BabysitterGirlModel;
