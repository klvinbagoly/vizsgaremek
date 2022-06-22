const AlbumInfo = require('../../models/albumInfo.model')
const express = require('express')
const controller = require('../base/controller')(AlbumInfo)
const albumInfoController = require('./album.info.controller')

const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.get('/name/:name', controller.findByName)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

router.post('/:id/tag', controller.addTag)

router.patch('/add-track/:id', albumInfoController.addTrack)
router.patch('/update-track/:id', albumInfoController.updateTrack)

module.exports = router