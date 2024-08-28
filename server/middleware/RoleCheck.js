import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const RoleCheck = (roles = []) => {

    dotenv.config();
    const jwtsecret = process.env.JWT_SECRET;

 if ( typeof roles === 'string') {
    roles = [roles];
 }

 return (req,res,next) => {
    
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader); 

    if (!authHeader) {
      return res.status(401).send({ message: 'Access denied. No Auth Header.' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); 

    if (!token) {
      return res.status(401).send({ message: 'Access denied. No token provided.' });
    }
    try{
        const decoded = jwt.verify(token, jwtsecret);
        // req.user = decoded;

        if(roles.length && !roles.includes(decoded.user.role)){
            return res.status(401).send({message: 'Acess denied. Do not have the right role', checktoken : decoded})
        }

        next();
    } catch (err){
        res.status(400).send({message: "Invalid token."});
    }

 };
};

export default RoleCheck;