// function main(){
// 	console.log("Hello goorm!");
// }

// main();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('', {
	useNewUrlParser: true,
	useCreateIndex: true
}). then(() => {
	console.log('Connectd to DB!');
}).catch(err => {
	console.log('Error:', err.message);
});

app.get('/', (req, res) => {
	res.send('Is this thing on?');
});

app.listen(3000, () => {
	console.log('server listening on port 3000');
});
