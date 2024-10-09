import {
    FileReadService,
    FileUploadService,
    LoginService, ProfileReadService,
    ProfileUpdateService,
    RegistrationService, SingleFileDeleteService
} from "../service/StudentService.js";

export const Register = async (req, res) => {
    let result = await RegistrationService(req);
    return res.status(200).json(result);
}

export const Login = async (req, res) => {
    let result = await LoginService(req,res);
    return res.status(200).json(result);
}

export const ProfileRead = async (req, res) => {
    let result = await ProfileReadService(req);
    return res.status(200).json(result);
}

export const ProfileUpdate = async (req, res) => {
    let result = await ProfileUpdateService(req, res);
    return res.status(200).json(result);
}

export const FileUpload = async (req, res) => {
    let result = await FileUploadService(req);
    return res.status(200).json(result);
}

export const FileRead = async (req, res) => {
    let result = await FileReadService(req, res);
    return res.sendFile(result);
}

export const SingleFileDelete = async (req, res) => {
    let result = await SingleFileDeleteService(req, res);
    return res.status(200).json(result);
}



