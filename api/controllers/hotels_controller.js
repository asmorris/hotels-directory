var mongoose = require('mongoose')
var Hotel = mongoose.model('Hotel')

module.exports.getAllHotels = (req, res) => {

	var offset = 0;
	var count = 5;

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10)
	}
	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10)
	}

	Hotel
		.find()
		// Built in mongoose functions (skip and limit)
		.skip(offset)
		.limit(count)
		.exec((err, hotels) => {
			console.log('Found hotels', hotels.length)
			res
				.json(hotels)
		})
}

module.exports.getOneHotel = (req, res) => {
	var hotelId = req.params.hotelId
	console.log("Get hotelId", hotelId)

	Hotel
		.findById(hotelId)
		.exec((err, doc) => {
			res
				.status(200)
				.json(doc)
		})

}

module.exports.addOneHotel = (req, res) => {
	var db = dbConnection.get()
	var collection = db.collection('hotels')
	var newHotel

	console.log('POST new hotel')

	if (req.body && req.body.name && req.body.stars) {
		newHotel = req.body
		newHotel.stars = parseInt(req.body.stars, 10)
		collection.insertOne(newHotel, (err, response) => {
			if (err) {
				console.log(err)
				return
			}
			console.log(response.ops)
			res
				.status(201)
				.json(response.ops)
		})
	} else {
		console.log('Data missing from body')
		res
			.status(400)
			.json({ message: 'Required data was missing from body'})
	}


}
