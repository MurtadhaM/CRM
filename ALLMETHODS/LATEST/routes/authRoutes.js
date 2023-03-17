import express from "express"

const router = express.Router();
import { firebaseAuth } from "../controllers/middlewareController.js";
import "../controllers/authController.js";
import authController from "../controllers/authController.js";

router.get("/", function(req, res) {
    res.render("index");
});


router.get("/login", function(req, res) {

    res.render("login");
});

router.post("/login", function(req, res) {


    authController.login(req, res);
});


router.get("/signup", function(req, res) {
    res.render("signup");
})

router.post("/signup", function(req, res) {
    authController.signup(req, res);
});


router.get("/profile", function(req, res) {
    authController.profile(req, res);
});


router.get("/user", firebaseAuth, (req, res) => {
    res.send(req.user);
});

router.get("/forgot", (req, res) => {
    res.render("forgot");
});

router.post("/forgot", (req, res) => {
    authController.forgot(req, res);
});


router.get('/Settings', function(req, res) {
    res.render('settings');
});



router.get("/reset", (req, res) => {
    res.render("reset");
});

router.post("/reset", (req, res) => {

    authController.reset(req, res);
});


router.get("/logout", function(req, res) {
    authController.logout(req, res);
});

export { router as default }