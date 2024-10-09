import express from "express";
import AuthenticationMiddleware from "../app/middlewares/AuthenticationMiddleware.js";
import *  as StudentController from "../app/controllers/StudentController.js"

const router = express.Router();


router.post("/Register", StudentController.Register)
router.post("/Login", StudentController.Login)
router.get("/ProfileRead", AuthenticationMiddleware, StudentController.ProfileRead)
router.post("/ProfileUpdate", AuthenticationMiddleware, StudentController.ProfileUpdate)

router.post("/FileUpload", AuthenticationMiddleware, StudentController.FileUpload)
router.get("/FileRead/:fileName", AuthenticationMiddleware, StudentController.FileRead)
router.delete("/SingleFileDelete/:fileName", AuthenticationMiddleware, StudentController.SingleFileDelete)


export default router;