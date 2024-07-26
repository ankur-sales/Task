const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateRegister, validateLogin } = require('../utils/validation');

exports.registerUser = async (userData) => {
    try {

        const isValid = validateRegister(userData);


        if (!isValid) {
            return { status: 400, error: 'Validation failed.' };
        }

        let user = await User.findOne({ email: userData.email });
        if (user) {

            return { status: 409, error: 'User already registered.' };
        }

        user = new User(userData);
        await user.save();

        return { status: 201, user };
    } catch (error) {

        return { status: 500, error: 'Internal server error.' };
    }
};

exports.loginUser = async (loginData) => {
    try {
        const isValid = validateLogin(loginData);
        if (!isValid) {

            return { status: 400, error: 'Validation failed.' };
        }

        const user = await User.findOne({ email: loginData.email });
        if (!user) {

            return { status: 401, error: 'Invalid email or password.' };
        }

        const validPassword = await bcrypt.compare(loginData.password, user.password);
        if (!validPassword) {

            return { status: 401, error: 'Invalid email or password.' };
        }

        const token = jwt.sign({ _id: user._id }, 'secret_key', { expiresIn: '1h' });

        return { status: 200, token };
    } catch (error) {

        return { status: 500, error: 'Internal server error.' };
    }
};
