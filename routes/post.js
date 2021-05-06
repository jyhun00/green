var express = require('express');
var router = express.Router();
var postservices = require('../services/postservices')

const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

router.post('/delete',  doAsync(async function(req, res) {
        let post_no = req.body.post_no;
        console.log(req.body);
        console.log(post_no);
        let result = await postservices.delete(post_no);
        res.send(result);
}));

router.post('/write',  doAsync(async function(req, res) {
        let post_info = [];
        if(req.body.writer_name)
                post_info.writer_name = req.body.writer_name;
        if(req.body.photo)
                post_info.photo = req.body.photo;
        if(req.body.body)
                post_info.body = req.body.body;
        if(req.body.brand_id)
                post_info.brand_id = req.body.brand_id;

        let result = await postservices.write(post_info);
        res.send(result);
}));

router.get('/',  doAsync(async function(req, res) {
        let result = await postservices.getAll();
        console.log(result);
        res.json(result);
        return res;
}));





module.exports = router;


