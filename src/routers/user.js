

const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Помилка при отриманні користувачів:', error.message);
        res.status(500).send('Помилка сервера');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Користувача не знайдено');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Помилка при отриманні користувача:', error.message);
        res.status(500).send('Помилка сервера');
    }
});

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Помилка при додаванні користувача:', error.message);
        res.status(400).send('Неможливо додати користувача');
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send('Користувача не знайдено');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Помилка при оновленні користувача:', error.message);
        res.status(400).send('Неможливо оновити користувача');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('Користувача не знайдено');
        }
        res.status(200).send('Користувач видалений успішно');
    } catch (error) {
        console.error('Помилка при видаленні користувача:', error.message);
        res.status(400).send('Неможливо видалити користувача');
    }
});

router.delete('/', async (req, res) => {
    try {
        await User.deleteMany();
        res.status(200).send('Всі користувачі видалені успішно');
    } catch (error) {
        console.error('Помилка при видаленні всіх користувачів:', error.message);
        res.status(400).send('Неможливо видалити всіх користувачів');
    }
});

module.exports = router;
