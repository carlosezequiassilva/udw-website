const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attributes: {
        type: Schema.Types.ObjectId,
        ref: 'Attributes'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }
});

module.exports = mongoose.model('Tags', tagsSchema);