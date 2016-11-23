var hello = (name) => {
	console.log("Hello " + name);
}

var intro = () => {
	console.log("I'm a node file called index.js");
}

module.exports = {
	hello: hello,
	intro: intro
}
