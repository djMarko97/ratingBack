const mongoose = require('mongoose');

const gymSchema = mongoose.Schema({
    gymname: {type: String},
    address: {type: String, default: ''},
    place: {type: String, default: ''},
    type: {type: String, default: ''},
    website: {type: String, default: ''},
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},//uzima id iz druge konekcije odnosno iz usera
    imageId: {type: String, default: ''},
    imageVersion: {type: String, default: ''},
    rating: [{
        user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        service:{type: Number, default: 0},
        staff:{type: Number, default: 0},
        equipement:{type: Number, default: 0},
        hygiene:{type: Number, default: 0},
        overall:{type: Number, default: 0},
        review:{type: String, default: ''},
        created:{type: Date, default: Date.now}
    }],
    totalStars: {type: Number, default:0},
    ratingOverall: [Number],
    serviceTotal: [Number],
    staffTotal: [Number],
    equipementTotal: [Number],
    hygieneTotal: [Number],
    members: [{
        member: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }]
});

module.exports = mongoose.model('Gym', gymSchema);