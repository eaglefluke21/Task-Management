import UserModel from "../models/User.js";
import connect from "../config/db.js";
import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResetEmail } from "../utils/email.js";
import crypto from 'crypto';
import TaskModel from "../models/Task.js";

connect();

dotenv.config();

const decryptKey = process.env.KEY; 

const jwtsecret = process.env.JWT_SECRET;

// function to check if decrypt key is working or not 
export function checkenv(req,res) {

    res.send({msg : decryptKey});

};

export function checkreq(req,res) {
    res.send({msg: 'its me admin'})
};


// logic to send key for encryption 
export async function cryptoEncryption(req,res) {
        res.send({msgkey: decryptKey});
}


export async function checkrole(req,res)  {
    res.json({ message: 'User Role ', user: req.user });
}


export async function checklogstatus(req,res){
    const token = req.cookies.token;

    if (!token) {
        return res.json({ isLoggedIn: false });
      }

      jwt.verify(token, jwtsecret, (err, decoded) => {
        if (err) {
          return res.json({ isLoggedIn: false });
        }
    
        
        res.json({ isLoggedIn: true });
      });

}

export async function userlogout(req,res){
    res.clearCookie('token', {path: '/'});
  res.json({ isLoggedIn: false });
}

// logic fo Login
export async function userLogin(req,res) {
    const {email, password} = req.body;
    try {

     let user = await UserModel.findOne({email});

     if(!user){
        return res.status(400).json({msg:"Invalid Email or Password"});
     }

     const decryptedPassword = CryptoJS.AES.decrypt(password,decryptKey).toString(CryptoJS.enc.Utf8);

     const isMatch = await bcrypt.compare(decryptedPassword,user.password);

    if(!isMatch){
        return res.status(400).json({msg:"Password did not match"});
    }

    // create payload for jwt 
    const payload = {
        user:{
            id:user.id,
            role:user.role,
        }
    };

    // Generate jwt token
    jwt.sign(
        payload,
        jwtsecret,
        {expiresIn : '1h'},
        (err,token) => {
            if (err) {
                console.error('Error generating token:',err);
                return res.status(500).json({msg:"Error generating token"});
            }


            const oneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);

            res.cookie('token', token, {
                httpOnly: true,
                expires: oneDay,
                secure: true,
                sameSite: 'None',
                path: '/'  
            });

          

            res.status(202).json({ msg: "Logged in successfully!" });
            console.log("Logged in successfully");
        }
    );

    } catch(error) {
        console.log("Error occured:", error);
        res.status(500).json({err: 'Server Error'});
    }
}


//logic to create admin account 

export async function adminRegister(req,res) {
    const { username, email , password ,role} = req.body;

    

    try {
        
    
        const decryptedPassword = CryptoJS.AES.decrypt(password,decryptKey).toString(CryptoJS.enc.Utf8);
    
        console.log('orgpass',decryptedPassword);
    
        let user = await UserModel.findOne({email});
    
        if (user) {
           return res.status(400).json({ msg : 'Admin already exists'});
        }
    
        const hashedPassword = await bcrypt.hash(decryptedPassword,10);
    
        console.log('hash',hashedPassword);
    
        user = new UserModel({
            username,
            email,
            password:hashedPassword,
            role,
        });
    
        await user.save();
    
        res.status(201).json(
            {msg: 'User created sucessfully'  }
        );
    
    
    } catch (error) {
    
        console.error(error.message);
        res.status(500).json({err:'Server Error'})
    }
    
        console.log("route working");
}




// logic for user account
export async function userRegister (req,res) {

const { username, email , password ,role} = req.body;

    

try {
    

    const decryptedPassword = CryptoJS.AES.decrypt(password,decryptKey).toString(CryptoJS.enc.Utf8);

    console.log('orgpass',decryptedPassword);

    let user = await UserModel.findOne({email});

    if (user) {
       return res.status(400).json({ msg : 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(decryptedPassword,10);

    console.log('hash',hashedPassword);

    user = new UserModel({
        username,
        email,
        password:hashedPassword,
        role,
    });

    await user.save();

    res.status(201).json(
        {msg: 'User created sucessfully'  }
    );


} catch (error) {

    console.error(error.message);
    res.status(500).json({err:'Server Error'})
}

    console.log("route working");
}


//logic to request password reset

export async function forgotPassword(req,res) {

    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ msg : 'User Not found'});
  
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 3600000; // 1 hour
  
    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();
  
    sendResetEmail(email, token);
    res.status(201).json(
        {msg: 'Password reset email sent'  }
    );

}


//logic to reset password

export async function resetPassword(req,res){

    const { token } = req.params;
  const { password } = req.body;
  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({msg:'Invalid or expired token'});

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(201).json(
    {msg: 'Password reset successful'  }
);

};




 // Get Tasks
 const getTasks = async (req, res) => {

  try{

    const userId = req.user.user.id;
    const tasks = await TaskModel.find({user: userId });
    res.json(tasks);
  }catch(error){
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
    
  };
  
  
  
  
  // Add Tasks
  const addTask = async (req, res) => {
      const { title, description } = req.body;
  
      console.log("check incoming data",{title,description});
    
    try {

      const userId = req.user.user.id;

      const task = new TaskModel({
        title,
        description,
        user: userId,
      });
    
      const createdTask = await task.save();
      res.status(201).json(createdTask);

    } catch (error) {
      console.error('Error saving task:', error);
      res.status(500).json({ error: 'Failed to save task' });

    }

      
    };
    
   
// Delete Task
const deleteTask = async (req, res) => {
  try {
    const userId = req.user.user.id;

    const task = await TaskModel.findOne({ _id: req.params.id, user: userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    const result = await TaskModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

    
    
  // update task 
  const updateTask = async (req, res) => {
    const { title, description, completed } = req.body;
    const taskId = req.params.id;
    const userId = req.user.user.id; 
  
    try {

      const task = await TaskModel.findOne({ _id: taskId, user: userId });
  
      if (task) {

        task.set({
          title: title || task.title,
          description: description || task.description,
          completed: completed !== undefined ? completed : task.completed,
        });
  
        const updatedTask = await task.save();
        res.json(updatedTask);
      } else {

        res.status(404).json({ error: 'Task not found or you are not authorized to update this task' });
      }
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  };
  
  
const markTaskCompleted = async (req, res) => {
  try {
    const userId = req.user.user.id;

    const task = await TaskModel.findOne({ _id: req.params.id, user: userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    task.completed = true; 
    await task.save();

    res.json({ message: 'Task marked as completed' });
  } catch (error) {
    console.error('Error marking task as completed:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

    
  
  
  export { addTask, getTasks ,deleteTask, updateTask , markTaskCompleted };
