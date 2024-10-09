import { TokenDecode } from "../utilities/TokenUtility.js";

export default (req, res, next) => {
    let token = req.cookies["Token"];
    let decoded = TokenDecode(token)

    if (decoded === null) {
        res.status(401).json({ status: "fail", message: "Unauthorized" })
    }
    else {

        // Set cookie for refresh token
        let options = {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
            sameSite: "none",
            secure: true,
        };
        res.cookie("Token", decoded.RefreshToken, options);

        req.headers.email = decoded.email;
        next();
    }
};
