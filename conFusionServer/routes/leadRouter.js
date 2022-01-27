const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const leaders = require('../models/leaders');

const leadRouter = express.Router();
leadRouter.use(bodyParser.json()) ;
leadRouter.route('/')
.get((req,res,next) => {
    leaders.find({})    //find from mongoose find all return of find hanldled in leaders in then
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);  //put leaders=result and reply with json file
    }, (err) => next(err))  //handle error
    .catch((err) => next(err));
})
.post((req, res, next) => {
    leaders.create(req.body)
    .then((lead) => {
        console.log('lead Created ', lead);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
   
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
  leaders.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));    
});



leadRouter.route('/:leadId')
.get((req,res,next) => {
    leaders.findById(req.params.leadId)    //find from mongoose find all return of find hanldled in leaders in then
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);  //put leaders=result and reply with json file
    }, (err) => next(err))  //handle error
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaders');
})
   
.put((req, res, next) => {
  leaders.findByIdAndUpdate(req.params.leadId, {$set : req.body} , {new: true}) //new:true to return new updates
    .then((lead) => {
        console.log('lead Created ', lead);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
  leaders.findByIdAndRemove(req.params.leadId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));    
});

module.exports = leadRouter ; 