// Schema for `POST /api/user` body
module.exports = PostCreateSchema = {
    type: 'object',
    required: ['text', 'images'],
    properties: {
        title: { type: 'string' },
        text: { type: 'string' },
        comment: { type: 'string' },
        // publisher: { type: 'number' }
    },
}

