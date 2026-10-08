const axios = require("axios");
const { google } = require("googleapis");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const oauth2client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    // 1. Exchange Google authorization code for tokens
    const googleRes = await oauth2client.getToken(code);

    // 2. Set Google credentials
    oauth2client.setCredentials(googleRes.tokens);

    // 3. Get Google user information
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${googleRes.tokens.access_token}`,
        },
      }
    );

    // 4. Get user data
    const { name, email, picture } = userRes.data;

    // 5. Check if user already exists
    let user = await UserModel.findOne({ email });

    // 6. Create user if doesn't exist
    if (!user) {
      user = await UserModel.create({
        name,
        email,
        image: picture,
      });
    }

    // 7. Create JWT
    const { _id } = user;

    const token = jwt.sign(
      {
        _id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TIMEOUT,
      }
    );

    // 8. Send response
    return res.status(200).json({
      message: "Success",
      token,
      user,
    });
  } catch (err) {
    console.error("Google Login Error:", err);

    return res.status(500).json({
      message: "Failed",
      error: err.message,
    });
  }
};

module.exports = {
  googleLogin,
};