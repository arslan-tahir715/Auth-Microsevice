import { IUser } from "../src/ts/interfaces/user_interface"
const { secret } = require('./config/auth.config')
const db  = require('./models')
const LocalStrategy = require('passport-local').Strategy;
const PassportJWT = require("passport-jwt");
const JWTStrategy   = PassportJWT.Strategy;
const ExtractJWT = PassportJWT.ExtractJwt;
const { compareSync } = require("bcrypt");

const initialize = (passport: { use: (arg0: string, arg1: any) => void; }) => {
    const verify = (email: string, password: string, cb: (arg0: Error | null, arg1: IUser | null) => void) => {
        const resolve = (user: IUser) => {
            if (!user) return cb(new Error('Invalid Password'), null)
            const passwordIsValid = compareSync(
                password,
                user.password
            )
            if (!passwordIsValid) return cb(new Error('PASSSWORD_ERROR'), null);
            else cb(null, user);
            
        }  
        db.user.findOne({
            where: {
                email,
            }
        }).then(resolve);
    }
  
    passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, verify))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : secret
    },
    (jwtPayload: IUser, cb: (arg0: Error | null, arg1: IUser | null) => void) => {
        return db.user.findOne({
            where: {
                id: jwtPayload.id,
            }
        }).then((user: IUser) => {
                return cb(null, user);
            })
            .catch((err: Error | null) => {
                return cb(err, null);
            });
        }
    ));
  }

  module.exports = initialize;

