const mongoose = require('mongoose');

const poolSchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mentee: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: mongoose.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Pool', poolSchema);