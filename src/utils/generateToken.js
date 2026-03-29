import jwt from "jsonwebtoken";

const generateToken = () => {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    return token;
};

export default generateToken;
