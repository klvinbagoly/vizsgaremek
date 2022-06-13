const TopAlbums = require('../../models/topAlbums.model')
const express = require('express')
const controller = require('../base/controller')(TopAlbums)
const topAlbumController = require('./top-albums.controller')

const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.get('/artist/:artist', topAlbumController.findTopAlbumsByArtist)

module.exports = router