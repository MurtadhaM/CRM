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
    res.render("documents");
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

router.put("/Upload", function(req, res) {

    Upload(req, res);

});
import multer from 'multer';
const limits = { fileSize: 1000000, files: 1 };
const upload = multer({
    dest: './uploads/'
}, {
    limits: limits
}, {
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})






router.post('/Upload', upload.single('avatar'), function(req, res) {
        console.log("uploading.....");
        if (!req.file.mimetype.includes("image") || !req.file.mimetype.includes("pdf")) {
            console.log("uploading....." + req.file.filename);

            res.send({ "code": 401, "message": "File type not supported" });
            res.end(JSON.stringify({
                "code": 200,
                "message": "File uploaded successfully"
            }));


        } else {

            res.send({ "code": 200, "message": "File uploaded successfully" });


            res.end(JSON.stringify({
                "code": 200,
                "message": "File uploaded successfully"
            }));

            console.log(" uploaded successfully");

        }
    }

)



export default router;