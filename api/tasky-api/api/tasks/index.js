import express from 'express';
import Task from './taskModel';
import asyncHandler from 'express-async-handler';
import '../../db';

const router = express.Router(); // eslint-disable-line

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find().populate('userId', 'username');
    res.status(200).json(tasks);
});

// create a task

router.post('/', asyncHandler(async (req, res) => {
    const task = await Task(req.body).save();
    res.status(201).json(task);
}));

// Get a user's tasks
router.get('/user/:uid', async (req, res) => {
    const tasks = await Task.find({ userId: `${req.params.uid}`});
    res.status(200).json(tasks);
});


export default router;
