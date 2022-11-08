const express = require('express');
const  {AddFavoriteCrypto,GetFavoriteCrypto,RemoveFromFavorite} = require('../FavoriteController/favoriteController')

const router = express.Router();

router.get('/getfavoritecoin',GetFavoriteCrypto);
router.post('/addfavorite',AddFavoriteCrypto);
router.post('/removefavorite',RemoveFromFavorite);


module.exports = router;