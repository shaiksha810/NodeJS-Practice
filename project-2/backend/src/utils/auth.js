import jwt from "jsonwebtoken"
import config from "../config/config.js"


const generateTokens = (userId) => {    
    const accessToken = jwt.sign({userId}, config.ACCESS_TOKEN, { expiresIn:"15m" })
    const refreshToken = jwt.sign({userId}, config.REFRESH_TOKEN, { expiresIn:"7d" })

    return {
        accessToken,
        refreshToken
    }
}


const verifyAccessToken = (token) => {

    const decode = jwt.verify(token, config.ACCESS_TOKEN)
    console.log(decode)

    return decode
}

const verifyRefreshToken = (token) => {

    const decode = jwt.verify(token, config.REFRESH_TOKEN)
    // console.log(decode)

    return decode
}



export {
    generateTokens,
    verifyAccessToken,
    verifyRefreshToken
}