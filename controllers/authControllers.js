const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password is required to register" });
    }

    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser) {
        return res.status(400).json({ message: "Register first, username not found" });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "userId": foundUser._id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    )

    return res.status(200).json({ accessToken, username });

}


const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password is required to register" });
    }
    const foundUser = await User.findOne({ username });

    if (foundUser) {
        return res.status(400).json({ message: "Change the username, that username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: passwordHash
    })

    const savedUser = await newUser.save();
    return res.status(200).json({ message: `Successfully registered. Username: ${savedUser.username}` });

}

const check = async (req, res) => {
    const { accessToken } = req.body;
    if (!accessToken) {
        return res.status(400).json({ message: "Access token is not present" });
    }

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid access token" });
            }
            return res.status(200).json({ message: decoded.UserInfo.userId })
        }
    )
}

module.exports = {
    login,
    register,
    check
}