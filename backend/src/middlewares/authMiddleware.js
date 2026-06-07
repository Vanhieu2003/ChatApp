import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Không tìm thấy token" });
        }
         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.error("Lỗi xác thực token:", err);
                return res.status(403).json({ message: "Access token không hợp lệ" });
            }

            const user = await User.findById(decoded.userId).select("-hashedPassword");
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }


            req.user = user;
            next();
        });

    }catch (error){


            console.error("Lỗi xác thực:", error);
            res.status(401).json({ message: "Không xác thực được người dùng" });
    }
}