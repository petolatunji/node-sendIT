const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide name'],
        minlength:3,
        maxlenght:50
    },
    email:{
        type:String,
        required:[true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
      },
      phoneNumber:{
        type:Number,
        required:[true, 'Please provide phone number'],
        minlength:3,
        maxlenght:12
    },
    address:{
        type:String,
        required:[true, 'Please provide address'],
        minlength:3,
        maxlenght:50
    },
});

//hashing password
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)

})
// creat jwt token
UserSchema.methods.createJWT= function () {
return jwt.sign({userId: this._id, name: this.name }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

//Compare Password
UserSchema.methods.comparePassword = async function (userPassword) {
const isMatch = await bcrypt.compare(userPassword, this.password)
return isMatch
}

module.exports = mongoose.model('User',UserSchema)