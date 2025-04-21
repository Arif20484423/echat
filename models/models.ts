import mongoose,{Schema} from 'mongoose'
import { timeStamp } from 'node:console'

const userSchema=new mongoose.Schema({
    email:{type:String ,required:true,unique:true},
    password:{type:String},
    name:String,
    description:String,
    image:String
    
})
const User=mongoose.models?.user  || mongoose.model('user',userSchema)

const userunverifiedSchema= new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    otp:{type:String,required:true},
    validdate:{type:Date,required:true},
})

const Userunverified= mongoose.models?.userunverified || mongoose.model('userunverified',userunverifiedSchema)

export {User,Userunverified};


const channelSchema= new Schema({
    user:{type:Schema.Types.ObjectId,ref:"user",required:true},
    channelid:{type:Schema.Types.ObjectId},
    starttime:{type:Date,default:new Date()},
    isgroup:{type:Boolean,default:false},
    lastSeen:{type:Date,required:true},
    lastMessage:{type:Date,required:true},
    deleted:{type:Boolean,default:false}
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
channelSchema.virtual("connections",{
    ref:"channel",
    localField:"channelid",
    foreignField:"channelid"
})
channelSchema.virtual("group",{
    ref:"group",
    localField:"channelid",
    foreignField:"channel"

    
})
export const Channel= mongoose.models?.channel || mongoose.model("channel",channelSchema);



const messageSchema= new Schema({
    message:{type:String},
    user:{type:Schema.Types.ObjectId,ref:"user",required:true},
    time:Date

})


export const Message = mongoose.models?.message || mongoose.model("message",messageSchema)

const groupSchema = new Schema({
    channel:{type:Schema.Types.ObjectId,required:true},
    name:String,
    description:String,
    image:{type:String,ref:"file"}

})
export const Group= mongoose.models?.group || mongoose.model("group",groupSchema);

const channelmessageSchema= new Schema({
    user:{type:Schema.Types.ObjectId,required:true,ref:"user"},
    channel:{type:Schema.Types.ObjectId,required:true},
    message:{type:Schema.Types.ObjectId,ref:"message"},
    file:{type:Schema.Types.ObjectId,ref:"userfile"},
    time:{type:Date,required:true},
    delete:{type:Boolean,default:false}
})

export const ChannelMessage= mongoose.models?.channelmessage || mongoose.model("channelmessage",channelmessageSchema)

const fileSchema= new Schema({
    file:String,
    name:String,
    time:Date,
    type:String,
    extension:String
})
export const Files= mongoose.models?.file || mongoose.model("file",fileSchema);

const userFileSchema= new Schema({
    user:{type:Schema.Types.ObjectId,required:true,ref:"user"},
    file:{type:Schema.Types.ObjectId,required:true,ref:"file"},
    name:{type:String},
    time:Date,
    delete:{type:Boolean,default:false},
    folder:{type:Schema.Types.ObjectId,required:true}

})

export const UserFile= mongoose.models?.userfile || mongoose.model("userfile",userFileSchema)

const userFolderSchema= new Schema({
    user:{type:Schema.Types.ObjectId,required:true},
    name:{type:String,required:true},
    parentfolder:{type:Schema.Types.ObjectId},
    changeallowed:{type:Boolean,default:true},
    delete:{type:Boolean,default:false}
})

export const UserFolder= mongoose.models?.userfolder || mongoose.model("userfolder",userFolderSchema)