// Absolutely no longer needed, but interesting to keep to see how it is done.

var mongoClient = require('mongodb').MongoClient
var dbURL = 'mongodb://localhost:27017/meanHotelsUdemy'

var _connection = null;
var open = () => {
	mongoClient.connect(dbURL, (err, db) => {
		if (err) {
			console.log("DB Connection failed")
			return
		}

		_connection = db;
		console.log('DB Connection open', db)


	})
}

var get = () => {
	return _connection
}

module.exports = {
	open: open,
	get: get
}
