const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        // Remove the required property to make it optional
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phn: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
