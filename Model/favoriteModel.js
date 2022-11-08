const mongoose = require('mongoose');

const favoriteCryptoSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    favoriteCryptoArr:[{
        name: String,
        image: String,
        current_price: String,
        price_change_percentage_24h: String,
        market_cap: String
    }]
})

const FavoriteCrypto = mongoose.model('Favorite',favoriteCryptoSchema);
module.exports = FavoriteCrypto;