var express = require('express');
var router = express.Router();
var brandservices = require('../services/brandservices')

const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

/* GET home page. */
router.get('/findAll/:brandnm', doAsync(async function(req, res) {
    var brandnm =  req.params.brandnm;
    let result = await brandservices.findAll(brandnm);
    res.send(result);
}));

router.get('/find/:brandnm',  doAsync(async function(req, res)  {
    var brandnm =  req.params.brandnm;
    let result = await brandservices.findOne(brandnm);
    res.send(result);
    })
);

router.get('/add/:brandnm', doAsync(async function(req, res) {
    var brandnm =  req.params.brandnm;
    let result = await brandservices.add(brandnm);
    res.send(result);
}));



module.exports = router;
