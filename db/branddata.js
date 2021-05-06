var pool = require('../config/db')
var brandQuery = {
    findOne : async function(brandnm){
        let result;
        try{
            let [rows] = await pool.query("select * from brand where brand_name like ?",brandnm)
            result = rows;
            console.log(result);
        }catch(e){
            result = e.message;
            console.log(e)
        }finally {
            return result;
        }
    },

    findAll : async function(brandnm){
        let result;
        try{
            let [rows] = await pool.query("select * from brand where brand_name=?",brandnm);
            result = rows;
        }catch(e){
            console.log(e)
            result = e.message;
        }finally{
            return result;
        }
    },
    add : async function(brandnm){
        let result;
        try{
            let [rows] = await pool.query('insert into brand(brand_name) values(?)', brandnm);
            result = rows;
        }catch(e){
            console.log(e)
            result = e.message;
        }finally {
            return result;
        }
    },
}


module.exports = brandQuery;