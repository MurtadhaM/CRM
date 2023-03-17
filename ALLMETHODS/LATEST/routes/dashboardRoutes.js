import express from "express"

const router = express.Router();

import { home, saveImageMessage, Upload, updateProfile } from "../controllers/dashboardController.js";


router.get("/", function(req, res) {

    home(req, res);
});




router.get("/Clients", function(req, res) {

    res.render("clients");
});
router.get("/Documents", function(req, res) {
    res.render("requests");
});
router.get("/Account", function(req, res) {
    res.render("profile");
});
router.get("/Dashboard", function(req, res) {
    res.render("dashboard");
});
router.get("/Requests", function(req, res) {
    res.render("requests");

});

router.get("/Settings", function(req, res) {
    res.render("settings");
});

router.get("/Login", function(req, res) {
    res.render("login");
});



export default router;