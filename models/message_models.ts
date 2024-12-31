import mongoose,{Schema} from "mongoose";

const channelSchema= new Schema({
    user:{type:Schema.Types.ObjectId,required:true},
    channelid:Schema.Types.ObjectId,
    isgroup:{type:Boolean,default:false}
})

export const Channel= mongoose.models?.channel || mongoose.model("channel",channelSchema);



const messageSchema= new Schema({
    message:{type:String,required:true},
    user:{types:Schema.Types.ObjectId,required:true},
    channel:{types:Schema.Types.ObjectId,required:true},
    time:Date,
    deleted:{type:Boolean,default:false},
    selfdelete:{type:Boolean,default:false},
    otherdelete:{type:Boolean,default:false}

})

export const Message = mongoose.models?.message || mongoose.model("message",messageSchema)

const groupSchema = new Schema({
    groupname:String,
    description:String,
    
})