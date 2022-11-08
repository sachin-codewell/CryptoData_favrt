const express = require('express');
const mongoose  = require('mongoose');
const favoriteRoutes = require('./FavoriteRoutes/favoriteRoutes')
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const port = 5000;
const Favorite_URL = 'mongodb://localhost:27017/FavoriteCryptoDB';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors({
    origin:true,
    credentials:true
    
}));

app.use('/api',favoriteRoutes)



mongoose.connect(Favorite_URL);
mongoose.connection.once('open', () => {
    console.log('Connected to server');
}).on('error', (err) => {
    console.log(err);
});

app.listen(port,(err)=>{
    if(!err){
        console.log("server is running on port " + port);
    }
})
