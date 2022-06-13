const ArtistInfo = require('../../models/artistInfo.model')
const express = require('express')
const controller = require('../base/controller')(ArtistInfo)

const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.get('/name/:name', controller.findByName)

module.exports = router