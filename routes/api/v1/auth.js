const express = require('express')
const User = require('../../../models/User')
const config = require('config')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const auth = require('../../../middleware/auth')
router.get('/', auth, async (req, res) => {
    try {
        const user =  await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err) {
        res.status(401).json({msg: err.message})
    }
})

router.post('/', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user){
            return res.status(403).json({"msg": "User dont exist"})
        }
        verifiedUser = await bcrypt.compare(password, user.password)
        if(!verifiedUser){
            return res.status(403).json({"msg": "Username or password are not correct"})
        }
        token = jwt.sign({
            user: {
                id: user.id,
                name: user.name
            }
        }, 
        config.get('jwtSecret'),
        {"expiresIn": 3600},
        (err, token) => {
            if(err) throw err
            res.json({token, user})
        })
    } catch(err) {
        res.status(500).json({"msg": "Internal server error"})
    }
})

module.exports = router