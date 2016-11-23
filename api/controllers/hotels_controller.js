var dbConnection = require('../data/dbconnection.js')
var objectID = require('mongodb').ObjectId
var hotelData = require('../data/hotel-data.json')

module.exports.getAllHotels = (req, res) => {
	var db = dbConnection.get()
	var collection = db.collection('hotels')

	var offset = 0;
	var count = 5;

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10)
	}
	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10)
	}

	collection
		.find()
		.skip(offset)
		.limit(count)
		.toArray((err, data) => {
			console.log('found data', data)
			res
				.status(200)
				.json(data)
		})



	// var returnData = hotelData.slice(offset, offset+count)
}

module.exports.getOneHotel = (req, res) => {
	var db = dbConnection.get()
	var collection = db.collection('hotels')
	var hotelId = req.params.hotelId
	console.log("Get hotelId", hotelId)
	collection
		.findOne({
			_id: objectID(hotelId)
		}, (err, data) => {
			res
				.status(200)
				.json(data)
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
