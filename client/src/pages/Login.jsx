import React ,{ useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginImage from "../assets/login.jpg";
import { NavLink } from "react-router-dom";
import CryptoJS from "crypto-js";
import cryptoEncrypt from "../utils/cyptoEncrypt";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup.jsx";
import apiAxios from "../services/api.js";



function Login() {


    const[isPopupVisible , setPopupVisible] = useState(false);

    const navigate = useNavigate();
    
    const [Formdata, setFormdata] = useState({
        email:'',
        password:'',
    })

   const handleChange = (e) => {

        setFormdata({
            ...Formdata,[e.target.id] : e.target.value
        })

    }

   const handleSubmit = async(e) => {

        e.preventDefault();



        try{
            const cryptoKey = await cryptoEncrypt();

            const encryptedPassword = CryptoJS.AES.encrypt(Formdata.password,cryptoKey).toString();

            const data = {...Formdata,password: encryptedPassword}

            const response = await apiAxios.post(`/users/login`,data);
            console.log("checking response",response);

            if(response.status === 202) {
                
                console.log("navigating to home page");
                navigate('/home');
                           
            } else {
                console.error('User Login failed', error);
                setPopupVisible(true);  
            }

           

        } catch(error) {
            console.log("error occured while Logging In:",error);
            setPopupVisible(true);  
        }
    }


    const closePopup = () => {
        setPopupVisible(false);
    };



    return (
        <div className="flex flex-col min-h-screen   bg-blue-400">
        <Header/>

        <div className="flex flex-col flex-grow lg:flex-row lg:justify-evenly py-16 rounded-md">

            <form className="flex flex-col justify-center px-6 sm:px-40 lg:px-20 lg:w-[40rem]" onSubmit={handleSubmit}>

            <p className="font-quick text-3xl font-bold mb-10">Log In to Your Account</p>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Email Address </label>
            <input id="email" type="email" value={Formdata.email} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " onChange={handleChange} required></input>
            </div>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Password </label>
            <input id="password" type="password" value={Formdata.password} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold" onChange={handleChange} required></input>
            </div>

            <NavLink to="/forgot-password" className="font-quick font-bold gap-0 hover:underline cursor-pointer ml-auto mb-2"> Forgot Password ?</NavLink>

            <button className="w-full bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white "> Log In</button>

            <p className="font-quick font-semibold  mx-auto mt-2 "> Don't Have an Account. <NavLink to="/Signup"> <span className="font-quick font-bold hover:underline cursor-pointer">Create a New Account.</span></NavLink></p>
            


            </form>  

            <img src={LoginImage} className="rounded-md shadow-md w-1/3 h-1/2 object-cover invisible lg:visible"/> 

        </div>

        <div>
            {
                isPopupVisible && 
                    <Popup message="Wrong Email or Password" onClose={closePopup} />
                
            }

        </div>


        <Footer/>

        </div>
    );
};

export default Login;