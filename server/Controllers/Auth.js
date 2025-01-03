const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res) => {
    try {
        const {username,account_type,password,confirmPassword} = req.body;

        if(!username || !account_type || !password || !confirmPassword)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        if(password !== confirmPassword) {
            return res.status(500).json({
                success : false,
                message : 'both passwords are not matched',
            });
        }

        const hashedpassword = await bcrypt.hash(password,10);

        const details = await User.create({
            username : username,
            password : hashedpassword,
            account_type : account_type,
        });

        return res.status(200).json({
            success: true,
            message : 'register hogya',
            details,
        })


    }catch(error) {
        return res.status(500).json({
            success: false,
            message : 'server down',
        })
    }
}

exports.signin = async (req,res) => {
    try {
        const {username , password} = req.body;

        if(!username || !password)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }


        const details = await Admin.findOne({username : username});

        if(!details) {
            return res.status(401).json({
                success : false,
                message : 'register first',
            });
        }

        if(await bcrypt.compare(password,details.password))
        {
            // console.log('dhfhff');
            // token and cookies develop kro then send to frontend
            const payload = {
                userid : details._id,
                account_type : details.account_type,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "5h",
            });    
            // console.log(token);
            return res.cookie('token',token,{
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }).status(200).json({
                success : true,
                message: 'login successfully',
                token,
                details,
            })
        }else {
            return res.status(401).json({
                success : false,
                message : 'enter correct details',
            });
        }
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at sign in admin',
        });
    }
}