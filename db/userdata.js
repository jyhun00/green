var pool = require('../config/db')
var userQuery = {
    findByEmail : async function(email){
        let result;
        try{
            let [rows] = await pool.query("select * from user where email like ?", email)
            result = rows;
            console.log(result);
        }catch(e){
            result = "findByEmail: DB 조회중 에러 발생";
            console.log(e)
        }finally {l
            return result;
        }
    },

    findById : async function(id){
        let result;
        try{
            let [rows] = await pool.query("select * from user where kakao_id = ?", id)
            result = rows;
        }catch(e){
            result = "findById: DB 조회중 에러 발생";
            console.log(e)
        }finally {
            return result;
        }
    },



    addData : async function(email, kakaoid){
        let result;
        try {
            let [rows] = await pool.query("update user set kakao_id=? where email like email", [kakaoid, email])
            result = rows;
            console.log(result);
        } catch (e) {
            result = "addData: DB INSERT 에러 발생";
            console.log(e)
        } finally {
            return result;
        }
    },

    addUser : async function(kakao_id, access_token, refresh_token, kakao_access_expired_time, kakao_refresh_expired_time, email){
        let result;
        try {
            let [rows] = await pool.query("insert into user(kakao_id, kakao_access, kakao_refresh,kakao_access_expired_time, kakao_refresh_expired_time, email) values(?,?,?,?,?,?)", [kakao_id, access_token, refresh_token, kakao_access_expired_time, kakao_refresh_expired_time, email])
            result = rows;
        } catch (e) {
            result = "addUser: DB INSERT 에러 발생";
            console.log(e)
        } finally {
            return result;
        }
    }


}


module.exports = userQuery;