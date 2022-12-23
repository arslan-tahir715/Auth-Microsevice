import { Request, Response, NextFunction  } from "express"
import { IUser } from "../ts/interfaces/user_interface"
const db = require("../models");
const User = db.user;

const checkDuplicateEmail = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user: IUser) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;