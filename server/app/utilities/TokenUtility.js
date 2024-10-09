import {JWT_EXPIRE_TIME, JWT_SECRET_KEY} from "../config/config.js";
import jwt from "jsonwebtoken";

export const TokenEncode=(email,user_id)=>{
    const KEY= JWT_SECRET_KEY
    const EXPIRE={expiresIn: JWT_EXPIRE_TIME}
    const PAYLOAD={email:email,user_id:user_id}
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
}

export const TokenDecode = (token) => {
    try {
        let key = JWT_SECRET_KEY;
        let expire = JWT_EXPIRE_TIME;
        let decoded = jwt.verify(token, key);


        // Refresh token add
        if (!!decoded.email === true) {
            let RefreshToken = jwt.sign({ email: decoded.email,user_id:decoded.user_id }, key, { expiresIn: expire })
            return { RefreshToken, email: decoded.email };
        }

    } catch (err) {
        return null;
    }
};
