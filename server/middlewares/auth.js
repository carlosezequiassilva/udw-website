const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

//LOGIN DATA

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.redirect('404');
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.redirect('404');
    }
}

module.exports = {
    authMiddleware
}