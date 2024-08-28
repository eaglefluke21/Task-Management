import jwt from 'jsonwebtoken';
import doetnv from 'dotenv';

doetnv.config();

const createJwt = (user) =>  {

    const payload = {
        user:{
            id:user.id,
            role:'user',
        }
    };

    return jwt.sign(
        payload,
         process.env.JWT_SECRET,
         { expiresIn: '1h',}
);
};

export default createJwt;