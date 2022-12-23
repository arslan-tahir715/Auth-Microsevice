import { Request, Response } from "express";
const db = require("../models");
const User = db.user;

exports.allAccess = (req: Response, res: Response) => {
    User.findAll().then((users: any) => {
        if (!users) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
        }
        res.status(200).send(users);
    });
};

exports.userBoard = (req: Response, res: Response) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req: Response, res: Response) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req: Response, res: Response) => {
    res.status(200).send("Moderator Content.");
};