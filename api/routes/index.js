var express = require('express')
var router = express.Router()
var hotelsController = require('../controllers/hotels_controller.js')

router
	.route('/hotels')
	.get(hotelsController.getAllHotels)


module.exports = router
