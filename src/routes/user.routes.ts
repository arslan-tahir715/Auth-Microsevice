import express from "express"
const passport = require("passport");
const controller = require("../controllers/user.controller");

module.exports = (app: express.Application) => {
  app.use((req: express.Request, res, next) => {
    next();
  });

  app.get("/api/test/all",
    passport.authenticate('jwt', {session: false}),
    controller.allAccess
  );

  app.get(
    "/api/test/user",
    passport.authenticate('jwt', {session: false}),
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    passport.authenticate('jwt', {session: false}),
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    passport.authenticate('jwt', {session: false}),
    controller.adminBoard
  );
};