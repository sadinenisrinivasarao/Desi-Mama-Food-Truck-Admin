const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/foodItems')
        .then(function (response) {
            res.render('index', { foodItems: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.add_foodItem = (req, res) => {
    res.render('add_foodItem');
}

exports.update_foodItem = (req, res) => {
    axios.get('http://localhost:3000/api/foodItems', { params: { id: req.query.id } })
        .then(function (itemdata) {
            res.render("update_foodItem", { foodItem: itemdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}