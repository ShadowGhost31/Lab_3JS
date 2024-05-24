require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('MONGO_URL:', process.env.MONGO_URL); // Додайте цей рядок для перевірки

connectDB();

app.use(express.json());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
