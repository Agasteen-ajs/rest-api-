const express = require('express');

const router = express.Router();

const Task = require('../model/Task')

const List = require('../model/List');

//get all user .
router.get('/users', async (req, res) => {
	try {
		const task = await Task.find({});
		res.send(task);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});
// get user by id and city .
router.get('/users/:id', async (req, res) => {
	const taskId = req.params.id;
	try {
		const task = await Task.findById(taskId);
		if (!task) {
			return res.status(404).send({ error: 'user not found' });
		}
		res.send(task);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});
//add a new user .
router.post('/users', async (req, res) => {
	const newPost = new Task(req.body);
	try {
		await newPost.save();
		res.status(201).send(newPost);
	}
	 catch (err) {
		res.status(500).send();
	}
});

// update user by id .
router.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name','phone','username'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
		const task = await Task.findById(req.params.id);
		if (!task) {
			return res.status(404).send({ error: 'User not found' });
		}
		updates.forEach((update) => {
			task[update] = req.body[update];
		});
		await task.save();
		res.send(task);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

//delete user by id .
router.delete('/users/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.send(task);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

// get all tasks .
router.get('/Alltasks', async (req, res) => {
	try {
		const list = await List.find({});
		res.send(list);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});

// add new task .
router.post('/users/:id/tasks', async (req, res) => {
	const newtask = new List(req.body);
	const userId = req.params.id;
	try {
		const task = await Task.findById(userId);
		if (!task) {
			return res.status(404).send({ error: 'User not found' });
		}
		newtask.listId = userId;
		await newtask.save();
		res.status(201).send(newtask);
	} catch (err) {
		res.status(500).send();
	}
});

// delete a task .
router.delete('/Alltask/:tid', async (req, res) => {
	try {
		const task = await List.findByIdAndDelete(req.params.tid);
		res.send(task);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});


// list task by user id .
router.get('/Alltasks/:id', async (req, res) => {
	const taskId = req.params.id;
	try {
		const task = await List.findById(taskId);
		if (!task) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.send(task);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

// get all user who is not completed tasks
router.get('/', async (req, res) => {
	try {
        const task = await task.false({});
		res.send(json);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});


// update task by user id and task id
router.patch('/:id/tasks/:tid', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name','phone','username'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
		const task = await task.findById(req.params.id);
		if (!task) {
			return res.status(404).send({ error: 'User not found' });
		}
		updates.forEach((update) => {
			task[update] = req.body[update];
		});
		await task.save();
		res.send(json);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});
// get all user who is completed task
router.get('/', async (req, res) => {
	try {
        const task = await task.true({});
		res.send(json);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});
module.exports = router;