const User = require("../models/userModel");
const jwt = require("jsonwebtoken");



 const signup = async (req, res) => {
  try{

    const {name, email, password } = req.body;
    if (!email || !password || !name) {
        console.log('Signin failed: Missing email or password');
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        console.log("user already exist");
        return res.status(400).json({message: "user already exist"})
    }

    const newUser =await User.create({
        name,
        email,
        password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

   

    console.log(newUser);
    console.log(token);

    res.status(201).json({
      message: 'Signup successful',
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  }catch(error){
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
    
}


const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
        console.log("Invalid email or password")
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    
    

    res.status(200).json({
      message: 'Signin successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Server error during signin' });
  }
};

  
module.exports = {signin,signup}