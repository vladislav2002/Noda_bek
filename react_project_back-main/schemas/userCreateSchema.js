// Schema for `POST /api/user` body
module.exports = UserCreateSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username:  { type: 'string' },
        password:  { type: 'string' },
        postcount: { default: 0, type: 'number' },
        age: { type: 'number' }
    },
}

