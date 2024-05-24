

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.js');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Підключено до бази даних MongoDB');
    })
    .catch((err) => {
        console.error('Помилка підключення до бази даних MongoDB:', err.message);
    });


app.use(express.json());


app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
