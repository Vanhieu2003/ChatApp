import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    userA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});


friendSchema.pre("save",function (next) {
    if (a> b){
        this.userA = new mongoose.Types.ObjectId(b);
        this.userB = new mongoose.Types.ObjectId(a);
    }

    next();
});

friendSchema.index({userA:1,userB:1},{unique:true});

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;