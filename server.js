const express = require('express');
const mongoose = require('mongoose');

const task = require('./routes/task.js');
const db ='mongodb://127.0.0.1:27017';
const port = 4000;
const app = express();

app.use(express.json());
app.use('/task', task);
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log('MongoDB Connnected');
	})
	.catch((err) => {
		console.log({ err: err });
	});


app.listen(port, (err) => {
	if (err) {
		console.log({ err: err });
	}
	console.log('Server running on port ' + port);
});