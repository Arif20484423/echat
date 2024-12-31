import "server-only"

import mongoose from 'mongoose'

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