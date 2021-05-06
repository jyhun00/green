var postdata = require('../db/postdata')

var brand_service = {
    write :  async function(post_info){
        return await postdata.write(post_info);
    },
    delete : async function(post_no){
        return await postdata.delete(post_no);
    },
    exist : async function(post_no){
        return await postdata.exist(post_no);
    },
    getAll : async function() {
        return await postdata.getAll();
    }
}


module.exports = brand_service;