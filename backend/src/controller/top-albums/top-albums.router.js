const TopAlbums = require('../../models/topAlbums.model')
const express = require('express')
const controller = require('../base/controller')(TopAlbums)
const topAlbumController = require('./top-albums.controller')

const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.get('/artist/:artist', topAlbumController.findTopAlbumsByArtist)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router