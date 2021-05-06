const KaKaoStrategy = require('passport-kakao').Strategy ;
const passport = require('passport');
const userdata = require('../db/userdata');
const dotenv = require('dotenv');
const common = require("../util/common");
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;
const jwt = require('jsonwebtoken');


dotenv.config()

// 2. 카카오 로그인 (콜백 함수 실행 안 됨)
const kakaoStrategyOption = {
    clientID : process.env.KAKAO_KEY,
    clientSecret : process.env.KAKAO_SECRET,
    callbackURL :  "/users/redirect",
};

let kakaoVerify = async (accessToken, refreshToken, params, profile,  done) => {
    console.log("kakaoPassport.js");
    let email = "";
    if(profile._json.kakao_account.email)
        email = profile._json.kakao_account.email;
    let user =  await userdata.findById(profile.id);

    if(!common.isBlank(user)){
        user = user[0];
        done(null, user);
    }else{
        let expired_time = common.makeExpireTime(params.expires_in);
        let refresh_expired_time = common.makeExpireTime(params.refresh_token_expires_in);
        //ID 없을 시 회원정보 등록.
        await userdata.addUser(profile.id, accessToken, refreshToken, expired_time, refresh_expired_time, email)
    }
}

const jwtStrategyOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

async function jwtVerify(payload, done) {
    let user;
    try {
        user = await userDAO.find(payload.uid);
        if (!user) return done(null, false);
    } catch (e) {
        return done(e);
    }
    return done(null, user);
}



//
// kakaoPassport.use('kakao', new KaKaoStrategy({
//         clientID : process.env.KAKAO_KEY,
//         clientSecret : process.env.KAKAO_SECRET,
//         callbackURL :  "/users/redirect",
//     },
//     async (accessToken, refreshToken, params, profile,  done) => {
//     console.log("kakaoPassport.js");
//         let email = "";
//         if(profile._json.kakao_account.email)
//             email = profile._json.kakao_account.email;
//         let user =  await userdata.findById(profile.id)
//         if(!common.isBlank(user)){
//             done(null, user);
//         }else{
//             let expired_time = common.makeExpireTime(params.expires_in);
//             let refresh_expired_time = common.makeExpireTime(params.refresh_token_expires_in);
//             //ID 없을 시 회원정보 등록.
//             await userdata.addUser(profile.id, accessToken, refreshToken, expired_time, refresh_expired_time, email)
//         }
//     },
//
//
// ))

module.exports = () =>{
    passport.use('kakao',new KaKaoStrategy(kakaoStrategyOption, kakaoVerify));
}


