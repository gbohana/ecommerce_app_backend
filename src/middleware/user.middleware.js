const validationUser = (req, res, next) => {
    const user = req.body;
    if (!user.first_name || !user.last_name || !user.email || !user.password) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    if (
        user.password.length < 3 ||
        user.first_name.length < 3 ||
        user.last_name.length < 3
    ) {
        return res.status(400).json({ message: "Invalid required fields" });
    }
    next();
};

module.exports = validationUser;