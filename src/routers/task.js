// src/routers/task.js

const express = require('express');
const Task = require('../models/task');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Помилка при отриманні завдань:', error.message);
        res.status(500).send('Помилка сервера');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Завдання не знайдено');
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('Помилка при отриманні завдання:', error.message);
        res.status(500).send('Помилка сервера');
    }
});

router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Помилка при створенні завдання:', error.message);
        res.status(400).send('Неможливо створити завдання');
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send('Завдання не знайдено');
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('Помилка при оновленні завдання:', error.message);
        res.status(400).send('Неможливо оновити завдання');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send('Завдання не знайдено');
        }
        res.status(200).send('Завдання видалене успішно');
    } catch (error) {
        console.error('Помилка при видаленні завдання:', error.message);
        res.status(400).send('Неможливо видалити завдання');
    }
});

router.delete('/', async (req, res) => {
    try {
        await Task.deleteMany();
        res.status(200).send('Всі завдання видалені успішно');
    } catch (error) {
        console.error('Помилка при видаленні всіх завдань:', error.message);
        res.status(400).send('Неможливо видалити всі завдання');
    }
});


module.exports = router;
