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
	console.log('POST new hotel')
	console.log(req.body)
	res
		.status(200)
		.json(req.body)
}
