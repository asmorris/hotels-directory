var mongoose = require('mongoose')
var dbURL = 'mongodb://localhost:27017/meanHotelsUdemy'

mongoose.connect(dbURL)

mongoose.connection.on('connected', () => {
	console.log('Mongoose has connected to ' + dbURL)
})

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose has disconnected')
})

mongoose.connection.on('error', (err) => {
	console.log('Mongoose connection error: ' + err)
})

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose has exited through app termination (SIGINT)')
		process.exit(0)
	})
})

process.on('SIGTERM', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose has exited through app termination (SIGTERM)')
		process.exit(0)
	})
})

process.once('SIGUSR2', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose has exited through app termination (SIGUSR2)')
		process.kill(process.pid, 'SIGUSR2')
	})
})
