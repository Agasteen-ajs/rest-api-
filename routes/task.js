const express = require('express');

const router = express.Router();

const User = require('../model/Task')

const list = require('../model/List');
// const task = require('../task');
const { json } = require('express');

//get all user
router.get('/', async (req, res) => {
	try {
		const task = await task.find({});
		res.send(json);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});
// get user by id and city
router.get('/:id', async (req, res) => {
	const taskId = req.params.id;
	try {
		const task = await task.findById(userId);
		if (!task) {
			return res.status(404).send({ error: 'user not found' });
		}
		res.send(json);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});
//add a new user
router.post('/', async (req, res) => {
	const newPost = new list(req.body);
	const userId = req.params.id;
	try {
		const task = await task.findById(userId);
		if (!task) {
			return res.status(404).send({ error: 'User not found' });
		}
		newPost.listId = list.id;
		await newPost.save();
		res.status(201).send(newPost);
	} catch (err) {
		res.status(500).send();
	}
});

// update user by id
router.patch('/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name','phone','username'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
		const task = await User.findById(req.params.id);
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

//delete user by id
router.delete('/:id', async (req, res) => {
	try {
		const user = await task.RemovefindById(req.params.id);
		if (!task) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.send(json);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

// get all tasks
router.get('/tasks', async (req, res) => {
	try {
		const list = await Post.find({});
		res.send(json);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});

// add new task
router.post('/:id/task', async (req, res) => {
	const newtask = new task(req.body);
	const postId = req.params.pid;
	const userId = req.params.id;
	try {
		const task = await task.findById(userId);
		if (!task) {
			return res.status(404).send({ error: 'User not found' });
		}
		const list = await Post.findById(postId);
		if (!list) {
			return res.status(404).send({ error: 'list not found' });
		}
		newtask.listId = list.id;
		await newtask.save();
		res.status(201).send(newtask);
	} catch (err) {
		res.status(500).send();
	}
});

// delete a task
router.delete('/:id/task/:tid', async (req, res) => {
	try {
		const task = await task.Remove(req.params);
		if (!task) {
			return res.status(404).send({ error: 'task not found' });
		}
		res.send(json);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

// update task by user id and task id
router.patch('/:id/task/:tid', async (req, res) => {
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

// list task by user id
router.get('/:id', async (req, res) => {
	const taskId = req.params.id;
	try {
		const task = await task.findById(taskId);
		if (!task) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.send(json);
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