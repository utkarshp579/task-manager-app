const express = require("express");
const User = require("../models/User");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
});

// @route   PUT /api/profile
// @desc    Update user profile
// @access  Private
router.put("/", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: "Name is required" });
    }

    const user = await User.findById(req.user._id);
    user.name = name.trim();
    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error updating profile" });
  }
});

module.exports = router;
