import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import StudentModel from "../models/StudentModel.js";
import {TokenEncode} from "../utilities/TokenUtility.js";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const RegistrationService = async (req) => {
    try {
        let reqBody = req.body;
        let data = await StudentModel.create(reqBody);
        return { status: "success", data: data };


    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}

export const LoginService = async (req,res) => {
    try {
        let reqBody = req.body;
        let data = await StudentModel.aggregate([
            { $match: reqBody },
            { $project: { _id: 1, email: 1 } },
        ]);

        if (data.length > 0) {
            let token = TokenEncode(data[0]["email"], data[0]["_id"]);

            // Set cookie
            let options = {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true,
                sameSite: "none",
                secure: true,
            };

            res.cookie("Token", token, options);
            return { status: "success", token: token, data: data };
        } else {
            return { status: "unauthorized", data: data };
        }
    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}


export const ProfileReadService = async (req) => {
    try {
        let email = req.headers.email;

        let MatchStage = {
            $match: {
                email
            }
        };

        let project = {
            $project: {
                _id: 0,
                email: 1,
                firstName: 1,
                lastName: 1,
                img: 1,
                phone: 1,
            }
        };

        let data = await StudentModel.aggregate([
            MatchStage,
            project
        ]);

        return { status: "success", data: data[0] };
    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}



export const ProfileUpdateService = async (req) => {
    try {
        let reqBody = req.body;
        let email = req.headers.email;
        let data = await StudentModel.updateOne({email: email} , reqBody);
        return { status: "success", data: data };


    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}



export const FileUploadService = async (req) => {
    try {
        let files = req.files.file;

        if (!Array.isArray(files)) {
            files = [files];
        }

        for (let i = 0; i < files.length; i++) {
            const uploadPath = path.join(__dirname, '../../app/uploads', Date.now() + "-" + files[i].name);

            files[i].mv(uploadPath, (err) => {
                if (err) {
                    return { status: false, data: "Error occurred while uploading the file." };
                }
            });
        }

        return { status: true, data: "File(s) uploaded successfully!" };
    } catch (err) {
        return { status: false, data: err.toString() };
    }
}



export const FileReadService = async (req) => {
    try {
        const filename = req.params.fileName;
        const filePath = path.join(__dirname, '../../app/uploads', filename);
        return filePath
    } catch (err) {
        return { status: false, data: err.toString() };
    }
}


export const SingleFileDeleteService = async (req,res) => {
    try {
        const filename = req.params.fileName;
        const filePath = path.join(__dirname, '../../app/uploads', filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                res.status(500).send('Error Deleting File');
            }
        })
        return { status: true, data: "File deleted successfully!" };
    } catch (err) {
        return { status: false, data: err.toString() };
    }
}




