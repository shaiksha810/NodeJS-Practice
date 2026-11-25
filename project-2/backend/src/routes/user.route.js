import { Router } from "express"
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import { generateTokens, verifyRefreshToken, verifyAccessToken } from "../utils/auth.js"
// import jwt from "jsonwebtoken"
// import config from "../config/config.js"

const router = Router()

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body
        const isUserExists = await userModel.findOne({ email })

        if (isUserExists) {
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const newUser = await userModel.create({
            name,
            email,
            passwordHash: await bcrypt.hash(password, 12)
        })

        const tokens = await generateTokens(newUser._id)

        const accessToken = tokens.accessToken
        const refreshToken = tokens.refreshToken


        res.cookie("refreshToken", refreshToken, {httpOnly:true})

        newUser.refreshToken = refreshToken
        await newUser.save()

        // console.log("newUser", newUser);

        return res.status(201).json({
            message: "user created successfully",
            data: {
                user: {
                    name: newUser.name,
                    email: newUser.email,
                }
            },
            accessToken
        })

    } catch (error) {
        console.log("register error", error);

        return res.status(400).json({
            error: error.message
        })
    }


})

router.get("/me", async(req, res) => {

    try {
        const accessToken = req.headers["authorization"].split(" ")[1]

        if (!accessToken) {
            return res.status(401).json({
                message: "accessToken not found"
            })
        }

        const decode = verifyAccessToken(accessToken)
        const user = await userModel.findById(decode.userId)

         if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(201).json({
            message: "user fetched successfully",
            data: {
                user: {
                    name: user.name,
                    email: user.email
                }
            }
        })

    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized, Invalid or expired access token"
        })
     }
})


router.post("/refresh", async (req, res) => {

    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            res.status(401).json({
                message: "Unauthorized, refresh token not found"
            })
        }

        const decode = await verifyRefreshToken(refreshToken)
        const user = await userModel.findById(decode.userId)

          if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }


        if (user.refreshToken !== refreshToken) {
            user.refreshToken = null
            await user.save()
            return res.status(401).json({
                message: "Unauthorized, refreshToken is mismatch"
            })
        }



        const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user._id)


        res.cookie("refreshToken", newRefreshToken, { httpOnly: true })

        user.refreshToken = newRefreshToken
        await user.save()

        res.status(200).json({
            message: "Tokens refreshed successfully",
            accessToken
        })

    } catch (error) {

        console.log(error.message)
        return res.status(401).json({
            message:"Unauthorized, invalid or expired refresh token"
        })
    }

})


export default router


