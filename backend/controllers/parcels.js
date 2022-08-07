const Parcel = require('../models/Parcel')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllParcels = async (req,res) => {
    const parcels = await Parcel.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({parcels, count: parcels.length})
}

const getUserParcels = async (req,res) => {
    const parcels = await Parcel.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({parcels, count: parcels.length})
}

const getParcel = async (req,res) => {
    const {user:{userId},params:{id:parcelId}} = req

    const parcel = await Parcel.findOne({
        _id:parcelId,createdBy:userId
    })
    if(!parcel){
        throw new NotFoundError(`No parcel with id ${parcelId}`)
    }
    res.status(StatusCodes.OK).json({parcel})
}

const createParcel = async (req,res) => {
    req.body.createdBy = req.user.userId
    const parcel = await Parcel.create(req.body)
    res.status(StatusCodes.CREATED).json({message:('Parcel Created')})
}

const updateDestination = async (req,res) => {
    const {
        body:{destination},
        user:{userId},
        params:{id:parcelId}
    } = req

if(destination=== ''){
    throw new BadRequestError('destination field cannot be empty')
}

const parcel = await Parcel.findByIdAndUpdate({_id:parcelId, createdBy:userId},req.body, {new:true,
    runValidators:true})
    
    if(!parcel){
        throw new NotFoundError(`No parcel with id ${parcelId}`)
    }
    res.status(StatusCodes.OK).json({message:('Destination Updated')})
}

const updateCurrentLocation = async (req,res) => {
    const {
        body:{currentLocation},
        user:{userId},
        params:{id:parcelId}
    } = req

if(currentLocation=== ''){
    throw new BadRequestError('currentLocation field cannot be empty')
}

const parcel = await Parcel.findByIdAndUpdate({_id:parcelId, createdBy:userId},req.body, {new:true,
    runValidators:true})
    
    if(!parcel){
        throw new NotFoundError(`No parcel with id ${parcelId}`)
    }
    res.status(StatusCodes.OK).json({message:('Current Location Updated')})
}

const updateStatus = async (req,res) => {
    const {
        body:{status},
        user:{userId},
        params:{id:parcelId}
    } = req

if(status=== ''){
    throw new BadRequestError('status field cannot be empty')
}

const parcel = await Parcel.findByIdAndUpdate({_id:parcelId, createdBy:userId},req.body, {new:true,
    runValidators:true})
    
    if(!parcel){
        throw new NotFoundError(`No parcel with id ${parcelId}`)
    }
    res.status(StatusCodes.OK).json({message:('Status Updated')})
}


const deleteParcel = async (req,res) => {
    const {user:{userId},params:{id:parcelId}} = req

    const parcel = await Parcel.findByIdAndRemove({_id:parcelId, createdBy:userId})
    if(!parcel){
        throw new NotFoundError(`No parcel with id ${parcelId}`)
    }
    res.status(StatusCodes.OK).send(`Parcel with id${parcelId} deleted`)
}

module.exports = {
    getAllParcels,
    getUserParcels,
    getParcel,
    createParcel,
    updateDestination,
    updateCurrentLocation,
    updateStatus,
    deleteParcel
}