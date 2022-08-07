const express = require('express');
const router =express.Router()

const {getAllParcels,getUserParcels,createParcel,updateDestination,updateCurrentLocation,updateStatus,deleteParcel} = require('../controllers/parcels')

router.route('/').post(createParcel).get(getAllParcels)
router.route('/user').get(getUserParcels)
router.route('/:id/destination').put(updateDestination)
router.route('/:id/status').put(updateStatus)
router.route('/:id/currentLocation').put(updateCurrentLocation)
router.route('/:id/delete').delete(deleteParcel)

module.exports = router


    