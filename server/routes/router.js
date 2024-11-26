const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', services.homeRoutes);

route.get('/add-foodItem', services.add_foodItem)

route.get('/update-foodItem', services.update_foodItem)


// API
route.post('/api/foodItems', controller.create);
route.get('/api/foodItems', controller.find);
route.put('/api/foodItems/:id', controller.update);
route.delete('/api/foodItems/:id', controller.delete);


module.exports = route