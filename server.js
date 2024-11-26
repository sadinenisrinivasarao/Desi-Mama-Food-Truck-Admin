const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const axios = require('axios');
const services = require('./server/services/render');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: '.env' })


// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

// set view engine
app.set("view engine", "ejs")
// //app.set("views", path.resolve(__dirname, "views/ejs"))
// app.get('/', (req, res) => {
//     axios.get('https://desi-babai-food-truck-admin.vercel.app/api/foodItems')
//         .then(function (response) {
//             // Pass the foodItems to the view
//             res.render('index', { foodItems: response.data });
//         })
//         .catch(err => {
//             // Handle any errors from the axios request
//             console.error(err);
//             res.send("Error fetching data");
//         });
// });



app.get('/', services.homeRoutes);

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))

app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
// app.set("views", path.join(__dirname, "server", "views"));
app.set('views', path.join(__dirname, 'views'));
// load routers
app.use('/', require('./server/routes/router'))

// app.listen(`https://desi-babai-food-truck-admin.vercel.app`);

module.exports = app;