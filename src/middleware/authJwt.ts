import { Request, Response, NextFunction } from "express"
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err: Error, decoded: { id: number }) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.user = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;