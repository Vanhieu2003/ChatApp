export const authMe = async (req, res) => {
    try{
        res.status(200).json({ user: req.user });

    }catch (error){
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
}