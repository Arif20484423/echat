import mongoose,{Schema} from "mongoose";

const channelSchema= new Schema({
    user:{type:Schema.Types.ObjectId,required:true},
    username:String,
    channelid:Schema.Types.ObjectId,
    isgroup:Boolean
})

export const Channel= mongoose.models?.Channel || mongoose.model("channel",channelSchema);



// const messageSchema= new Schema({
//     message:{type:String},
//     user:

// })