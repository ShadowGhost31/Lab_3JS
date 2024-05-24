const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('MONGO_URL:', process.env.MONGO_URL); // Додайте цей рядок для перевірки
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Підключено до бази даних MongoDB');
    } catch (error) {
        console.error('Помилка підключення до бази даних MongoDB:', error.message);
        process.exit(1); // Вихід з процесу з кодом помилки
    }
};

module.exports = connectDB;
