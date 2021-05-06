var pool = require('../config/db')
var postQuery = {
    write : async function(post_info){
        let result;
        try{
            let [rows] = await pool.query("insert into post(writer_name, photo, body, brand_id) values(?, ?, ?,?)",
                [post_info.writer_name, post_info.photo, post_info.body, post_info.brand_id]);
            if(rows){
                result = true;
            }else{
                result = false;
            }
            return result;
        }catch(e){
            console.log(e)
        }
    },

    delete : async function(post_no){
        let result;
        try{
            let [rows] = await pool.query("delete from post where post_no = ?",post_no)
            if(rows){
                result = true;
            }else{
                result = false;
            }
            return result;
        }catch(e){
            console.log(e)
        }

    },
    exist : async function(post_no){
        let result;
        try{
            let [rows] = await pool.query("select * from post where post_no like ?",post_no)
            if(rows){
                result = true;
            }else{
                result = false;
            }
            return result;
        }catch(e) {
            console.log(e.message);
        }
    },
    getAll : async function(){
        let result;
        try{
            let [rows] = await pool.query("select * from post");
            result = rows;
            return result;
        }catch(e){
            console.log(e.message) ;
        }
    }
}


module.exports = postQuery;