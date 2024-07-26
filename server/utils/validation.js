const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv();
addFormats(ajv);

const userPostSchema = {
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string' },
        image: { type: 'string' }
    },
    required: ['user_id', 'title', 'description'],
    additionalProperties: false
};


const registerSchema = {
    type: 'object',
    properties: {
        username: { type: 'string', minLength: 3, maxLength: 30 },
        email: { type: 'string', format: 'email', minLength: 6 },
        password: { type: 'string', minLength: 6 }
    },
    required: ['username', 'email', 'password'],
    additionalProperties: false
};

const loginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email', minLength: 6 },
        password: { type: 'string', minLength: 6 }
    },
    required: ['email', 'password'],
    additionalProperties: false
};

exports.validateRegister = (data) => {
    const validate = ajv.compile(registerSchema);
    const valid = validate(data);
    if (!valid) {
        console.error('Validation errors:', validate.errors);
        return false;
    }
    return true;
};

exports.validateLogin = (data) => {
    const validate = ajv.compile(loginSchema);
    const valid = validate(data);
    if (!valid) {
        console.error('Validation errors:', validate.errors);
        return false;
    }
    return true;
};

exports.validateUserPost = (data) => {
    const validate = ajv.compile(userPostSchema);
    const valid = validate(data);
    if (!valid) {
        console.error('Validation errors:', validate.errors);
        return false;
    }
    return true;
};
