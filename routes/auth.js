const express = require('express');
const router = express.Router();
const http = require('http');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const JWTConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};
const jwt = require('jsonwebtoken');

const kakao_passport = require('../config/kakao-passport');
kakao_passport()
//카카오 로그인
router.get('/login/kakao', passport.authenticate('kakao'))

//카카오 로그인 리다이렉트
router.get('/redirect', function (req, res, next) {

    passport.authenticate('kakao', { failureRedirect: "/" },function (err, user) {
        console.log("kakao redirect")
        let token = {};
        let jwtToken = "";
        if(user){
            token.user_no = user.no;
            token.loginYN = true;
            jwtToken = jwt.sign(JSON.stringify(token), process.env.JWT_SECRET_KEY);
        }
        let result = {};
        result.greenToken = jwtToken;
        res.json(result);
        return res;

    })(req, res);
});

const isAuthenticated = () => (req, res, next) => {
    let loginYn = false;
    if(req.body.greenToken){
        let greenToken = jwt.decode(req.body.greenToken);
        if(greenToken.loginYN == true){
            loginYn = true;
        }
    }
    if(loginYn){
        next();
    }else{
        return res.sendStatus(403);
    }
}

const isNotAuthenticated = () => (req, res, next) => {
    let loginYn = false;
    if(req.body.greenToken){
        let greenToken = jwt.decode(req.body.greenToken);
        if(greenToken.loginYN == true){
            loginYn = true;
        }
    }
    if(loginYn){
        console.log("abcdef")
        return res.sendStatus(403);
    }else{
        next();
    }
}

//로그아웃 상태시
router.get('/login', isNotAuthenticated() , (req, res, next) =>{
    res.redirect("/users/login/kakao");
});

//로그인 상태시 메인화면으로 리다이렉트
router.get('/login', isAuthenticated() , (req, res, next) =>{
    res.redirect("/");
});


module.exports = router;
