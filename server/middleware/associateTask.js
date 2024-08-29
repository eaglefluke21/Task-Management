import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtsecret = process.env.JWT_SECRET;

const associateTask = (req, res, next) => {
    
    console.log('cook', req.cookies);
  const token = req.cookies.token; 
  console.log(JSON.stringify(req.cookies));


  if (!token) {
    console.log('token value', token);
      return res.sendStatus(403); 
  }

  jwt.verify(token, jwtsecret, (err, user) => {
      if (err) {
        console.log('token value verify', token);
          return res.sendStatus(403);
      }
      req.user = user; 
      next();
  });
};

export default associateTask;