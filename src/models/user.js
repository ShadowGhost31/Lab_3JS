

const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: 'Неправильний формат пошти'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate: {
            validator: (value) => {
                return !value.toLowerCase().includes('password');
            },
            message: 'Пароль не може мати слово \'password\''
        }
    },
    age: {
        type: Number,
        default: 0,
        validate: {
            validator: (value) => {
                return value >= 0;
            },
            message: 'Вік не може бути від\'ємним'
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
