import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Session from "../models/Session.js";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14*24*60*60; // 14 ngày
export const signUp = async (req, res) => {
    try {
        const {username, email, password, firstName, lastName} = req.body;
        if (!username || !email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "Không thể thiếu username, email, password, firstName hoặc lastName" });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username hoặc email đã tồn tại" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            hashedPassword,
            displayName: `${firstName} ${lastName}`
        });
        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công" });

    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
}


export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Không thể thiếu username hoặc password" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Người dùng không tồn tại" });
        }
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu/ username không chính xác" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
        const refreshToken = crypto.randomBytes(64).toString("hex");

        await Session.create({ userId: user._id, refreshToken, expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL * 1000) });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: REFRESH_TOKEN_TTL * 1000
        });

        return res.status(200).json({ message: `User ${user.username} đăng nhập thành công`,  token });


    }catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
}

export const signOut = async (req, res) => {
    try{
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            await Session.deleteOne({ refreshToken });
            res.clearCookie("refreshToken");
        }

        res.status(200).json({ message: "Đăng xuất thành công" });
    }catch (error)
    {
        console.error("Lỗi khi đăng xuất:", error);
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
}

export const refreshToken = async (req, res) => {
    try{
       const token = req.cookies?.refreshToken;
         if (!token) {
            return res.status(401).json({message:"Token không hợp lệ hoặc đã hết hạn"});
         }

         const session = await Session.find({refreshToken: token});
         if(!session){
            return res.status(403).json({message:"Token không hợp lệ hoặc đã hết hạn"});
         }

         if(session.expiresAt < new Date()){
            return res.status(403).json({message:"Token hết hạn"});
         }

         const accessToken = jwt.sign({
            userId: session.userId
         }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_TOKEN_TTL})

        return res.status(200).json({accessToken});


    }catch (error){
        console.error("Lỗi gọi refreshToken",error);
        return res.status(500).json({message:"Lỗi hệ thống"})
    }
}