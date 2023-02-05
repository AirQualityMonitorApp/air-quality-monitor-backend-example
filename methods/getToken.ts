import { Response, Request, NextFunction } from "express";
import * as admin from "firebase-admin";

export const requestToken = async(req: Request, res: Response, next: NextFunction) => {
    
  const authHeader = req.headers.authorization;   
  if (authHeader) {
    const idToken = authHeader
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(function() {
        return next()
      })
      .catch(function (error) {
        console.log(error);
        return res.sendStatus(403);
      });
  } else {
    res.sendStatus(401);
  };
};