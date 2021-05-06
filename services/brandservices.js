var {db, db2}  = require('../config/db');
var branddata = require('../db/branddata')

var brand_service = {
    findOne :  async function(brandnm){
        let result = await branddata.findOne(brandnm);
        console.log("findOne")
        return result;
    },
    findAll : async function(brandnm){
        let result = await branddata.findAll(brandnm);
        console.log("findOne")
        return result;
    },
    add : async function(brandnm){
        console.log("add")
        let findresult = await branddata.findOne(brandnm);
        console.log(findresult);
        if(!findresult){
            return "이미 존재합니다.";
        }else{
            let result = await branddata.add(brandnm);
            return result;
        }
    },
}


module.exports = brand_service;