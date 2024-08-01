const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attributesSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tags'
    }],
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }
});

module.exports = mongoose.model('Attributes', attributesSchema);