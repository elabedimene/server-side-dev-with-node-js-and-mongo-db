const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const promotions = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json()) ;
promoRouter.route('/')
.get((req,res,next) => {
    promotions.find({})    //find from mongoose find all return of find hanldled in promotions in then
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);  //put promotions=result and reply with json file
    }, (err) => next(err))  //handle error
    .catch((err) => next(err));
})
.post((req, res, next) => {
    promotions.create(req.body)
    .then((promo) => {
        console.log('promo Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
   
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
  promotions.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));    
});



promoRouter.route('/:promoId')
.get((req,res,next) => {
    promotions.findById(req.params.promoId)    //find from mongoose find all return of find hanldled in promotions in then
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);  //put promotions=result and reply with json file
    }, (err) => next(err))  //handle error
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions');
})
   
.put((req, res, next) => {
  promotions.findByIdAndUpdate(req.params.promoId, {$set : req.body} , {new: true}) //new:true to return new updates
    .then((promo) => {
        console.log('promo Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
  promotions.findByIdAndRemove(req.params.promoId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));    
});

module.exports = promoRouter ; 