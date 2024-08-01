const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    postTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    tags: {
        type: Schema.Types.ObjectId,
        ref: 'Tags'
    },
    attributes: {
        type: Schema.Types.ObjectId,
        ref: 'Attributes'
    },
    date: {
        type: Date,
        default: Date.now
    },
    index: {
        type: String
    }
});


module.exports = mongoose.model('Posts', PostSchema);