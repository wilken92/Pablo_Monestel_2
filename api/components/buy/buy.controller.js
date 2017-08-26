var Buy = require('./buy.model.js');

module.exports.save = function(req, res){
  var newBuy = new Buy({
    player: req.body.player,
    property: req.body.property
  });

  newBuy.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo realizar la compra' + err});
    }else{
      res.json({success:true, msg:'Se registró correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  Buy.find().then(function(buys){
    res.send(buys);
  })
};

module.exports.update = function(req,res){
  Buy.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, buy) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}
