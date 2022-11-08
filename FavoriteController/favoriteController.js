const FavoriteCryptoModel = require('../Model/favoriteModel');

function AddFavoriteCrypto(req,res) {
    let cryptoInfo = req.body;
    console.log(req.body);
    FavoriteCryptoModel.findOne({ userid: cryptoInfo.userid }, (err, user) => {
        if (!user) {
            let Favorite = new FavoriteCryptoModel({
                userid: cryptoInfo.userid,
                favoriteCryptoArr: [{
                    name: req.body.name,
                    image: req.body.image,
                    current_price: req.body.current_price,
                    price_change_percentage_24h: req.body.price_change_percentage_24h,
                    market_cap: req.body.market_cap
                }]
            })
            Favorite.save((err) => {
                if (!err) {
                    res.status(201).send("User First Favorite Crypto Added in Favorite Array");
                }
            })
        }
        //end of if block
        else if (user) {
            FavoriteCryptoModel.findOneAndUpdate({ userid: cryptoInfo.userid },{
                $push:{
                    favoriteCryptoArr: {
                        name: req.body.name,
                        image: req.body.image,
                        current_price: req.body.current_price,
                        price_change_percentage_24h: req.body.price_change_percentage_24h,
                        market_cap: req.body.market_cap
                    }
                }
            },(err,data)=>{
                if(!err&&data){
                    res.status(200).send("User Already Have Some Favorite Crypto So New Crypto Added");
                }
            })


        }
        //end of else if
        else{
            throw err
        }


    })
}

// to get all favorite crypto of user
function GetFavoriteCrypto(req,res){
    FavoriteCryptoModel.findOne({userid:req.query.userid},(err,user)=>{
        if(user){
            res.status(200).send(user);
        }
        else{
            res.status(404).send({msg:"user not found"});
        }
    })
   
}

// Remove Crypto from FavoriteList

function RemoveFromFavorite(req,res){
    const info = req.body;
    FavoriteCryptoModel.findOneAndUpdate({userid:info._id},
        { $pull:{ favoriteCryptoArr:{name:info.name} }},
        (err,data)=>{
            if(!err&&data){
                res.status(200).send(data)
            }
            else{
                res.status(404).send({msg:"user Does Not Exist or This Cripto is not in your Favorite List"})
            }
        }
        )

}


module.exports = {GetFavoriteCrypto,AddFavoriteCrypto,RemoveFromFavorite}