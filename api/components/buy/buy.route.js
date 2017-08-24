var express = require('express');
var router = express.Router();
var blazeController = require('./blaze.controller.js');

//para aquellas rutas que ocupen un id

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_buy')
  .post(function(req,res){
    blazeController.save(req,res);
  });

router.route('/get_all_buy')
  .get(function(req,res){
    blazeController.findAll(req,res);
  });

router.route('/update_buy')
  .put(function(req, res){
    blazeController.update(req,res);
  });

module.exports = router;