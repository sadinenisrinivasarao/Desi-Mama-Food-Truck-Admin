const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    todayspecial: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: String,
        required: true,
    }
})

const FoodTruckdb = mongoose.model('FoodTruckdb', schema);

module.exports = FoodTruckdb;