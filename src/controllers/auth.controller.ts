import { Request, Response } from "express"
import { IUser } from "../ts/interfaces/user_interface"
const db = require("../models");
const config = require("../config/auth.config");
const passport = require('passport');
const { user: User, refreshToken: RefreshToken } = db;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req: Request, res: Response) => {
    // Save User to Database
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then((user: IUser) => {
        res.send({ message: "User was registered successfully!" });
    })
    .catch((err: Error) => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = async (req: Request, res: Response) => {
    passport.authenticate('login', {session: false}, (err: Error, user: IUser) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, async (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed json web token with the contents of user object and return it in the response
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration // 24 hours
            });
            const refreshToken = await RefreshToken.createToken(user);
            
            res.status(200).send({
                id: user.id,
                firstName: user.firstName,
                email: user.email,
                accessToken: token,
                refreshToken
            });
        });
    })(req, res);
};

exports.refreshToken = async (req: Request, res: Response) => {
    const { refreshToken: requestToken } = req.body;
  
    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
      const refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }  
      if (RefreshToken.verifyExpiration(refreshToken)) {
          RefreshToken.destroy({ where: { id: refreshToken.id } });
        
        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }

      const user = await refreshToken.getUser();
      const newAccessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
};