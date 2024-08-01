const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        defauld: Date.now()
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }
});

module.exports = mongoose.model('Category', categorySchema);