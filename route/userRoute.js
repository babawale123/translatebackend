const express = require('express');
const User = require('../model/userModel')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/', async(req,res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(404).json({message:'field must not be empty'})
    }
    const user = await User.findOne({email})
    if(user){
        res.status(404).json({message:"user with this email already exists"})
    }

     bcrypt.hash(password, 10).then((hash)=>{
        User.create({
            name:name,
            email:email,
            password:hash
        })
        res.status(200).json({message:'user created successfully'})
    })

})


router.post('/login', async(req, res) =>{
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Invalid credentials' });
      }
  
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        return res.status(400).json({ message: 'Password mismatch' });
      }
  
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
      res.status(200).json({ token});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
})
module.exports = router