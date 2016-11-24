var mongoose = require('mongoose')

// IMP: NEED TO HAVE NESTED SCHEMA'S DEFINED BEFORE PARENT SCHEMA, AND ALL MUST BE DEFINED BEFORE MODEL. OBVIOUSLY

var reviewSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
		required: true
	},
	review: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
})

var roomSchema = new mongoose.Schema({
	type: String,
	number: Number,
	description: String,
	photos: [String],
	price: Number
})

var hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	stars: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	services: [String],
	description: String,
	photos: [String],
	currency: String,
	reviews: [reviewSchema],
	rooms: [roomSchema],
	location: {
		address: String,
		/*
		Always store coordinates longitude (E/W) latitude (N/S) order!
		This also makes it so that you can store location data between multiple points and that you can then query it to find distances between them/from where you are. (the 2dsphere bit)
		*/
		coordinates: {
			type: [Number],
			index: '2dsphere'
		}
	}
})

mongoose.model("Hotel", hotelSchema, 'hotels')
