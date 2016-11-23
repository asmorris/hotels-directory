var fs = require('fs')

console.log("Going to get a file")

var onFileLoad = (err, file) => {
	console.log('Got the file');
}

fs.readFile('readFileSync.js', onFileLoad)


console.log('App continues')
