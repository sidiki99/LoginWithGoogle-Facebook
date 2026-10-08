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

    // 4. Get Google user data
    const { name, email, picture } = userRes.data;

    // 5. Find user
    let user = await UserModel.findOne({ email });

    // 6. Create user if doesn't exist
    if (!user) {
      user = await UserModel.create({
        name,
        email,
        image: picture,
      });
    }

    // 7. Create YOUR JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TIMEOUT || "7d",
      }
    );

    // 8. Save JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    console.log("Google JWT created for:", user.email);
    console.log("User ID:", user._id);

    // 9. Redirect to dashboard
    return res.redirect(
      `${process.env.CLIENT_URL}/dashboard`
    );

  } catch (err) {
    console.error("Google Login Error:", err);

    return res.status(500).json({
      message: "Failed",
      error: err.message,
    });
  }
};

 const facebookLogin = (req, res) => {
  const facebookURL =
    `https://www.facebook.com/v23.0/dialog/oauth` +
    `?client_id=${process.env.FACEBOOK_APP_ID}` +
    `&redirect_uri=${encodeURIComponent(
      process.env.FACEBOOK_REDIRECT_URI
    )}` +
    `&scope=email,public_profile`;

  res.redirect(facebookURL);
};

 const facebookCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        message: "Facebook authorization code missing",
      });
    }

    const tokenResponse = await axios.get(
      "https://graph.facebook.com/v23.0/oauth/access_token",
      {
        params: {
          client_id: process.env.FACEBOOK_APP_ID,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
          code: code,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

   const userResponse = await axios.get(
  "https://graph.facebook.com/v23.0/me",
  {
    params: {
      fields: "id,name,email,picture",
      access_token: accessToken,
    },
  }
);

    const facebookUser = userResponse.data;

  

    let user = await UserModel.findOne({
        email: facebookUser.email,
      });

    if (!user) {
      user = await UserModel.create({
        name: facebookUser.name,
        email: facebookUser.email,
        facebookId: facebookUser.id,
        image: facebookUser.picture?.data?.url,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (error) {
    console.log(
      "Facebook Login Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Facebook login failed",
      error: error.response?.data || error.message,
    });
  }
};


 const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id)
  
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log("Get Me Error:", error.message);

    res.status(500).json({
      message: "Failed to get user",
      error: error.message,
    });
  }
};


const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};

module.exports = {
  googleLogin,
  facebookLogin,
  facebookCallback,
  getMe,
  logout
};