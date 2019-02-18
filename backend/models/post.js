const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    header: { type: String, required: true },
    Content: { type: String, default: 'Empty Content' },
    imagePath : { type:String, required: true}
});

module.exports = mongoose.model('Post', postSchema);