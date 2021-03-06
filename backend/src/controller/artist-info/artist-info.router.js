const ArtistInfo = require('../../models/artistInfo.model')
const express = require('express')
const controller = require('../base/controller')(ArtistInfo)

const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.get('/name/:name', controller.findByName)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

router.post('/:id/tag', controller.addTag)

module.exports = router