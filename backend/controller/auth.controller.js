import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup = async (req, res) =>{
    const {username, email, password} = req.body;
    const hashpassword = bcrypt.hashSync(password, 10);
    try{
        if (!username || !email) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }
        

        const existingUser = await User.findOne({$or: [{username}, {email}]});

        if(existingUser){
            return res.status(403).json({success: false, message: 'User already exists'});
        } else {
            res.status(201).json({success: true, message: "Create successfully"});
        }
        const newUser = new User({username, email, password: hashpassword });
        await newUser   .save();
        
    } catch(error){
        console.error("Error", error);
        res.status(500).json({success: false, message: "Error Server"});
    }
};

export const login = async (req, res) =>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        

        if(!user){
            res.status(404).json({success: false, message: 'Wrong credentials'});
        }
        const correctPassword = await bcrypt.compare(password, user.password);
        if(!correctPassword){
            res.status(404).json({success: false, message: 'Invalid Password'});
        }
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        const expirydDate = new Date(Date.now() + 3600000);
        res.cookie('acess_token', token, 
            {httpOnly: true, expires: expirydDate});

        res.status(200).json({success: true, message: 'Successfully Login', 
            user: { id: user._id, username: user.username, email: user.email }});
    } catch (error){
        console.error("Error", error);
        res.status(500).json({success: false, message: "Error Server"});
    }
};