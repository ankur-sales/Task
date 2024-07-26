const authService = require('../services/authService');

exports.register = async (req, res) => {

    try {

        const result = await authService.registerUser(req.body);
        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }
        res.status(result.status).json({ message: 'User registered successfully', user: result.user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);
        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }
        res.status(result.status).json({ message: 'Login successful', token: result.token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};
