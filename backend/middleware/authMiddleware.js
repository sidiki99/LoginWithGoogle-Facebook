const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid token",
      error: error.message,
    });
  }
};

module.exports = protect;