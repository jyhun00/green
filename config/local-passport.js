
require('dotenv').config();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

const JWTConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

