const User = require("../models/User");
const OTP = require("../models/OTP");
const Course = require("../models/Course");
const Category = require("../models/Category");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const { mailSender } = require("../utilis/mailSender");
const { passwordUpdated } = require("../mail/template/passwordUpdate");
const jwtUtil = require("../config/jwtConfig");

require("dotenv").config();


// send otp
exports.sendOTP = async (req, res) => {
  try {
    // fetch email
    const { email } = req.body;

    // check user already present or not
    const checkuserpresent = await User.findOne({ email });

    // if yes
    if (checkuserpresent) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // if no generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // console.log("otp generated is: " + otp)

    // uniqueness
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp });
    }
    // console.log("Auth.js 47")

    //create DB entry
    const otpBody = await OTP.create({ email: email, otp: otp });
    // console.log(otpBody, "otp, 50")

    //send response
    return res.status(200).json({
      success: true,
      message: "OTP sent sucessfully",
      otp: otpBody.otp,
    });
  } catch (error) {
    console.log(error.message);
  }
};


//signup
exports.signUp = async (req, res) => {
  try {
    // console.log(req.body.otp)
    // data fetch from req.body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
      secretKey,
    } = req.body;
    // console.log(otp, "backend")
    //data validate
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All required field are not filled",
      });
    }
    // console.log(req.body.otp, "92")

    //check 2 password are match or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password not matched",
      });
    }

    if (accountType === "admin" && !secretKey) {
      return res.status(400).json({
        success: false,
        message: "Secret Key not found",
      });
    }
    if (secretKey && secretKey !== process.env.ADMIN_KEY) {
      return res.status(400).json({
        success: false,
        message: "Secret Key not matched",
      });
    }
    //check user already exist
    const existingUser = await User.findOne({ email });
    // console.log(req.body.otp, "104")

    //if user exist
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    //find most recent otp
    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(-1);
    // console.log(recentOTP, otp, "118");
    //validate otp
    if (otp !== recentOTP[0].otp) {
      return res.status(400).json({
        success: false,
        message: "OTP doesn't matched",
        // recentOTP,
        // otp,
      });
    } else if (recentOTP.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    //hash password
    let hashPassword;
    hashPassword = await bcrypt.hash(password, 10);

    // Create the user
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    //create db entry
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      confirmPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    //send response
    return res.status(200).json({
      success: true,
      message: "user signUp ucessfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user can't be registered",
      e: error.message,
    });
  }
};


//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const isExistUser = await User.findOne({ email })
      .populate("additionalDetails")
      .exec();
    if (!isExistUser) {
      return res.status(400).json({
        success: false,
        message: "user doesn't exist you have to registered first",
      });
    }

    //password matching
    if (await bcrypt.compare(password, isExistUser.password)) {

      const payload = {
        id: isExistUser._id,
        email: isExistUser.email,
        accountType: isExistUser.accountType,
      };

      const { accessToken, refreshToken } = jwtUtil.generateTokens(payload);

      isExistUser.refreshToken = refreshToken;
      await isExistUser.save();

      isExistUser.token = accessToken;
      isExistUser.password = undefined;

      const options = {
        expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      };

      return res.cookie("token", accessToken, options).status(200).json({
        success: true,
        token: accessToken,
        user: isExistUser,
        message: "Loggedin sucessfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "password not matched",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again",
      hint: error.message,
    });
  }
};

//relogin
exports.reLogin = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "userId not found",
      });
    }

    let existingUser = await User.findById(userId);
    if (!existingUser.refreshToken) {
      throw new Error("Refresh token not found");
    }
    try {
      const decode = jwtUtil.verifyRefreshToken(existingUser.refreshToken)
      req.user = decode
    } catch (error) {
      return res.status(401).json({ sucess: false, message: error.message, })
    }
    const payload = {
      id: isExistUser._id,
      email: isExistUser.email,
      accountType: isExistUser.accountType,
    };
    const { accessToken, refreshToken } = jwtUtil.generateTokens(payload);

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "User found",
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User not found",
      hint: error.message,
    });
  }
}


//logout
exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "userId not found",
      });
    }
    let existing = await User.findById(userId); //req.user.id
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    existing.refreshToken = null;
    await existing.save();

    return res.cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    }).status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      hint: error.message,
    });
  }
};


//change password
exports.changePassword = async (req, res) => {
  try {
    //data fetch from req body
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    // console.log(req.body)
    //validation
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All required fields are not filled",
      });
    }

    //find user by id
    const userDetails = await User.findById(req.user.id);

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }
    // hasUser= hasUser.toObject()
    // console.log(hasUser.password);
    //match password
    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );
    await mailSender(
      updatedUserDetails.email,
      "Password for your account has been updated",
      passwordUpdated(
        updatedUserDetails.email,
        `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
      )
    )


    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    // console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};


exports.getAdminData = async (req, res) => {
  try {
    const instructor = await User.find({ accountType: "instructor" }).countDocuments();
    const students = await User.find({ accountType: "student" }).countDocuments();
    const categories = await Category.find({}).populate("courses");
    const courses = await Course.find({ status: "Published" });

    const cat = categories.map((category) => category.courses.filter((course) => course.status === 'Published')
    );
    const categoryData = categories.map((category) => {
      return {
        id: category?._id,
        name: category?.name,
        income: category?.courses?.reduce((acc, course) => acc + course?.studentEnrolled?.length * course?.price, 0),
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        instructor,
        students,
        courses,
        categoryData,
        cat
      },
      categories
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching data",
      error: error.message,
    });
  }
}