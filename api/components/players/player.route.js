var express = require('express');
var router = express.Router();
var playerController = require('./player.controller.js');

//para aquellas rutas que ocupen un id

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_player')
  .post(function(req,res){
    playerController.save(req,res);

  });
router.route('/get_all_player')
  .get(function(req,res){
    playerController.findAll(req,res);
  });

 router.route('/update_player')
  .put(function(req, res){
    playerController.update(req,res);
 	});

module.exports = router;
