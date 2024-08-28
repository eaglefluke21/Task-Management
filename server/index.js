import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const port = process.env.PORT;

const reactUrl = process.env.REACT_URL;


const app = express();
app.use(cookieParser());

app.use(express.json());

const corsOptions = {
  origin: `${reactUrl}`, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));



app.get('/', (req, res) => {
    res.send('server root  working');
  });

app.use('/users',userRoutes());


app.listen(port , function(){
    console.log(`server is listening at http://localhost:${port}`);
});