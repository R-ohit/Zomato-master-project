import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

const Router = express.Router();

//Models 
import { UserModel } from "../../database/user";

/* 
Router     /signup
Descrip    signup with email+password
params     none
access     public
method     post
*/

Router.post("/signup", async(req,res) => {
    try {
        await UserModel.findEmailAndPhone(req.body.credentials);


        // db
        const newUser = await UserModel.create(req.body.credentials);

        // JWT Auth token
        const token = newUser.generateJwtToken();

        return res.status(200).json({token});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
Router     /signin
Descrip    signin with email+password
params     none
access     public
method     post
*/

Router.post("/signin", async(req,res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(
            req.body.credentials
        );

        // JWT Auth token
        const token = user.generateJwtToken();

        return res.status(200).json({token, status: "success"});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
Router     /google
Descrip    google signin
params     none
access     public
method     GET
*/

Router.get("/google", passport.authentication("google", {
scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
],
})
);

/* 
Router     /google/callback
Descrip    google signin callback
params     none
access     public
method     GET
*/

Router.get("/google/callback", passport.authentication("google", {failureRedirect: "/"}),
(req,res) => {
    return res.json({token: req.session.passport.user.token});
}
);

export default Router;