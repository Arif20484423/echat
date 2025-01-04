import mongoose,{Schema} from 'mongoose'

const userSchema=new mongoose.Schema({
    email:{type:String ,required:true,unique:true},
    password:{type:String},
    name:String,
    description:String,
    
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
    isgroup:{type:Boolean,default:false}
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
channelSchema.virtual("connections",{
    ref:"channel",
    localField:"channelid",
    foreignField:"channelid"
})

export const Channel= mongoose.models?.channel || mongoose.model("channel",channelSchema);



const messageSchema= new Schema({
    message:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,required:true},
    channel:{type:Schema.Types.ObjectId,required:true},
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
export const Group= mongoose.models?.group || mongoose.model("group",groupSchema);

