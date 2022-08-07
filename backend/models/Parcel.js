const { required } = require('joi')
const mongoose = require('mongoose')

const ParcelSchema = new mongoose.Schema({
product: {
    type: String,
    required:[true, 'Please provide parcelName'],
    maxlength:50,
},
price:{
    type:Number,
    required:[true, 'Please provide price']
  },
pickupLocation:{
    type:String,
    required:[true, 'Please provide location']
  },
  destination:{
    type:String,
    required:[true, 'Please provide location']
  },
  currentLocation:{
    type:String,
    required:[true, 'Please provide location']
  },
  recipientName:{
    type:String,
    required:[true, 'Please provide name']
  },
  recipientNumber:{
    type:String,
    required:[true, 'Please provide number']
  },
status: {
    type: String,
    enum:['completed','cancelled','pending'],
    default: 'pending'
},
createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
},
 
},{timestamps:true})

module.exports = mongoose.model('Parcel',ParcelSchema)