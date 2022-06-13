const Artist = require('../../models/artist.model')
const express = require('express')
const controller = require('../base/controller')(Artist)



const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)

module.exports = router
