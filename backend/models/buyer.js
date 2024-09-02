// // models/buyer.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const buyerSchema = new Schema({
//   firstName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   lastName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   userName: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   dateOfBirth: {
//     type: Date,
//     required: true
//   },
//   gender: {
//     type: String,
//     enum: ['male', 'female', 'prefer not to say'],
//     required: true
//   },
//   contactNumber: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   emailAddress: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   }
// }, { timestamps: true });

// const Buyer = mongoose.model('Buyer', buyerSchema);
// module.exports = Buyer;
// backend/models/buyer.js

const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    district: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Buyer', buyerSchema);
