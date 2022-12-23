import express from "express"
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
module.exports = (app: express.Application) => {
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/fe/v1/signup",
    [
        verifySignUp.checkDuplicateEmail,
    ],
    controller.signup
  );

  app.post("/api/fe/v1/login", controller.signin);

  app.post("/api/v1/refresh_token", controller.refreshToken);
};