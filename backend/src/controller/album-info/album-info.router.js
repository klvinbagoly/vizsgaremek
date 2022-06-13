const AlbumInfo = require('../../models/albumInfo.model')
const express = require('express')
const controller = require('../base/controller')(AlbumInfo)

const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.get('/name/:name', controller.findByName)

module.exports = router