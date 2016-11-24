var mongoose = require('mongoose')
var Hotel = mongoose.model('Hotel')

// GET all reviews for a hotel
module.exports.getAllReviews = (req, res) => {

	var hotelId = req.params.hotelId
	console.log("Get hotelId", hotelId)

	Hotel
		.findById(hotelId)
		// Only getting the review data, nothing else
		.select('reviews')
		.exec((err, doc) => {
			var response = {
				status: 200,
				message: []
			}
			if (err) {
				console.log('returned doc', doc)
				response.status = 500
				response.message = err
			} else if (!doc) {
				console.log("Hotel id not in the database", hotelId)
				response.status = 404
				response.message = {
					"message": "Hotel ID not found " + hotelId
				}
			} else {
				response.message = doc.reviews ? doc.reviews : []
			}
			res
				.status(response.status)
				.json(response.message)
		})
}

// GET a specific review for a hotel
module.exports.getOneReview = (req, res) => {
	var hotelId = req.params.hotelId
	console.log("Get hotelId", hotelId)
	var reviewId = req.params.reviewId
	console.log('GET reviewId' + reviewId + 'for hotelId' + hotelId)

	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec((err, hotel) => {
			var response = {
				status: 200,
				message: []
			}
			if (err) {
				console.log('returned doc', hotel)
				response.status = 500
				response.message = err
			} else if (!hotel) {
				console.log("Hotel id not in the database", hotelId)
				response.status = 404
				response.message = {
					"message": "Hotel ID not found " + hotelId
				}
			} else if (!hotel.reviews.id) {
				console.log("Review is not in the database", reviewId)
				response.status = 404
				response.message = {
					"message": "Review ID not found " + reviewId
				}
			} else {
				console.log("returned hotel", hotel)
				response.message = hotel.reviews.id(reviewId)
			}
			res
				.status(response.status)
				.json(response.message)
		})
}

// Helper method for adding reviews
var _addReview = (req, res, hotel) => {
	hotel.reviews.push({
		name: req.body.name,
		rating: parseInt(req.body.rating, 10),
		review: req.body.review
	})

	hotel.save((err, hotelUpdated) => {
		if (err) {
			res
				.status(500)
				.json(err)
		} else {
			res
				.status(200)
				.json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1])
		}
	})

}

// POST a review for a hotel
module.exports.addOneReview = (req, res) => {
	var hotelId = req.params.hotelId
	console.log("Get hotelId", hotelId)

	Hotel
		.findById(hotelId)
		// Only getting the review data, nothing else
		.select('reviews')
		.exec((err, doc) => {
			var response = {
				status: 200,
				message: []
			}
			if (err) {
				console.log('returned doc', doc)
				response.status = 500
				response.message = err
			} else if (!doc) {
				console.log("Hotel id not in the database", hotelId)
				response.status = 404
				response.message = {
					"message": "Hotel ID not found " + hotelId
				}
			}
			if (doc) {
				_addReview(req, res, doc)
			} else {
				res
					.status(response.status)
					.json(response.message)
			}
		})
}


// Update a review

module.exports.updateOneReview = (req, res) => {
	var hotelId = req.params.hotelId
	console.log("Get hotelId", hotelId)
	var reviewId = req.params.reviewId
	console.log('GET reviewId' + reviewId + 'for hotelId' + hotelId)
	var thisReview

	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec((err, hotel) => {
			thisReview = hotel.reviews.id(reviewId)
			var response = {
				status: 200,
				message: []
			}
			if (err) {
				console.log('returned doc', hotel)
				response.status = 500
				response.message = err
			} else if (!hotel) {
				console.log("Hotel id not in the database", hotelId)
				response.status = 404
				response.message = {
					"message": "Hotel ID not found " + hotelId
				}
			} else if (!thisReview) {
				response.status = 404
				response.message = {
					"message": "Review ID not found " + reviewId
				}
			}

			if (response.status !== 200) {
				res
					.status(response.status)
					.json(response.message)
			} else {
				thisReview.name = req.body.name
				thisReview.rating = parseInt(req.body.rating, 10)
				thisReview.review = req.body.review
			}

			hotel.save((err, updatedHotel) => {
				console.log(hotel)
				if (err) {
					res
						.status(500)
						.json(err)
				} else {
					res
						.status(204)
						.json()
				}
			})
		})
}

// Delete a review

module.exports.deleteOneReview = (req, res) => {
var hotelId = req.params.hotelId
	console.log("Get hotelId", hotelId)
	var reviewId = req.params.reviewId
	console.log('GET reviewId' + reviewId + 'for hotelId' + hotelId)
	var thisReview

	Hotel
		.findById(hotelId)
		.select('reviews')
		.exec((err, hotel) => {
			thisReview = hotel.reviews.id(reviewId)
			var response = {
				status: 200,
				message: []
			}
			if (err) {
				console.log('returned doc', hotel)
				response.status = 500
				response.message = err
			} else if (!hotel) {
				console.log("Hotel id not in the database", hotelId)
				response.status = 404
				response.message = {
					"message": "Hotel ID not found " + hotelId
				}
			}
			if (!thisReview) {
				response.status = 404
				response.message = {
					"message": "Review ID not found " + reviewId
				}
			}

			if (response.status !== 200) {
				res
					.status(response.status)
					.json(response.message)
			} else {
				thisReview.remove()
			}

			hotel.save((err, updatedHotel) => {
				console.log(hotel)
				if (err) {
					res
						.status(500)
						.json(err)
				} else {
					res
						.status(204)
						.json()
				}
			})
		})
}
