import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    email:{type:String ,required:true,unique:true},
    password:{type:String}
    
})
const User=mongoose.models?.User  || mongoose.model('User',userSchema)

const userunverifiedSchema= new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    otp:{type:String,required:true},
    validdate:{type:Date,required:true},
})

const Userunverified= mongoose.models?.Userunverified || mongoose.model('Userunverified',userunverifiedSchema)

export {User,Userunverified};