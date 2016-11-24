var express = require('express')
var router = express.Router()
var hotelsController = require('../controllers/hotels_controller.js')
var reviewsController = require('../controllers/reviews_controller.js')

// Hotels routes
router
	.route('/hotels')
	.get(hotelsController.getAllHotels)
	.post(hotelsController.addOneHotel)

router
	.route('/hotels/:hotelId')
	.get(hotelsController.getOneHotel)
	.put(hotelsController.updateOneHotel)
	.delete(hotelsController.deleteOneHotel)

//Reviews routes

router
	.route('/hotels/:hotelId/reviews')
	.get(reviewsController.getAllReviews)
	.post(reviewsController.addOneReview)

router
	.route('/hotels/:hotelId/reviews/:reviewId')
	.get(reviewsController.getOneReview)
	.put(reviewsController.updateOneReview)
	.delete(reviewsController.deleteOneReview)

module.exports = router
