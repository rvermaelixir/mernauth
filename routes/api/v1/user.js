const express = require('express')
const {validationResult, check} = require('express-validator')
const router = express.Router()
const User = require('../../../models/User')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const JWT_SECRET = ('../../../config/default.json').jwtSecret;
const bcrypt = require('bcryptjs')
const transporter = require('../../../config/email.js');


router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail().normalizeEmail(),
    check('phone', 'Phone is required').isMobilePhone(),
    check('dob', 'Date Of birth is required').isDate(),
    check('password', "Strong password is required").isLength({min: 6})
], async (req, res) => {
    check('confirmPassword', 'Passwords dont match').matches(req.body.password)
    const errors = validationResult(req)
    if(errors.isEmpty()){
        try{
            const {name, email, phone, dob, password} = req.body
            const userExist = await User.find({
                email,
                phone
            })
            if(userExist == 0){
                const salt = await bcrypt.genSalt(10)
                const cryptedPassword = await bcrypt.hash(password, salt)
                const user = new User({
                    uuid: uuid.v4(),
                    name,
                    email,
                    phone,
                    dob,
                    password: cryptedPassword
                })
                await user.save()
                return res.json({success: true, msg: "Registered Successfully"})
            }else{
                return res.json({success: false, msg: "User Already Exists"})
            }
            
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }else{
        return res.status(422).json({error: errors.array()})
    }
})


router.post('/forgot-password', async(req, res)=>  {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const secret = JWT_SECRET + user.password;
      const resetToken = jwt.sign({ id: user._id }, secret, {
        expiresIn: '1d',
        });
        
        const setUserToken = await User.findByIdAndUpdate({ _id: user._id }, { verifyToken : resetToken },{new: true});
        console.log(setUserToken);
        const link = `http://localhost:3000/reset-password/${setUserToken.verifyToken}`;
        console.log(link);
        const sender = "verma.ravi005@gmail.com";
        if(setUserToken){
            const mailOptions = {
                from: sender,
                to: email,
                subject: 'Password Reset Email',
                html: `<h2>Please click on given link to reset your password</h2>
                <a href=${link}>${link}</a>`
            }
            console.log(mailOptions);
            // transporter.sendMail(mailOptions, (err, info) => {
            //     if(err){
            //         console.log(err);
            //         res.status(500).json({message: 'Internal server error!!'});   
            //     }else{
            //         console.log(info);
            //         res.status(200).json({ message: 'Password reset email sent' });
            //     }
            // })
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Reset password
//Get token from email
router.get("/reset-password/:token", async(req, res) => {
    const { token } = req.params;
    console.log(token);
    try {
        const validUser = await User.findOne({verifyToken: token });
        if(validUser){
            console.log(`this is valid user ${validUser}`);
            const verifyTokenNew = jwt.verify(token, JWT_SECRET + validUser.password);
            console.log(verifyTokenNew);
            if (verifyTokenNew) {
                return res.status(200).json({status:200, message: 'Token verified' }); 
            }else{
                res.status(401).json({ message: 'Invalid token or expired' });
            }
        }
        else{
            res.status(401).json({ message: 'Invalid token or expired' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

 });

//Change password
router.post("/reset-password/:token", async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token);
    try {
        const validUser = await User.findOne({verifyToken: token });
        console.log(validUser);
        if(validUser){
            const verifyTokenNew = jwt.verify(token, JWT_SECRET + validUser.password);
            console.log(verifyTokenNew);
            if (verifyTokenNew) {
                const salt = await bcrypt.genSalt(10)
                const cryptedPassword = await bcrypt.hash(password, salt)
                const setNewUserPass = await User.findByIdAndUpdate({ _id: validUser._id }, { password: cryptedPassword, verifyToken: null },{new: true});
                console.log(setNewUserPass);
                if(setNewUserPass){
                    setNewUserPass.save();
                    return res.status(200).json({status:200, message: 'Password reset successful' });
                }else{
                    return res.status(401).json({ message: 'Invalid token or expired' });
                }
            }else{
                res.status(401).json({ message: 'Invalid token or expired' });
            }
        }else{
            res.status(401).json({ message: 'Invalid token or expired' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

});      



module.exports = router;
