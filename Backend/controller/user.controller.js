import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

// POST /user/signup
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();

    // Return user info (without password)
    res.status(201).json({
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// POST /user/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Return user info
    res.status(200).json({
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
