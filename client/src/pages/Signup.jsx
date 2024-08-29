import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupImage from "../assets/login.jpg";
import { NavLink } from "react-router-dom";
import CryptoJS from 'crypto-js';
import cryptoEncrypt from "../utils/cyptoEncrypt.jsx";
import Popup from "../components/Popup.jsx";
import apiAxios from "../services/api.js";


function Signup() {

    const[isPopupVisible , setPopupVisible] = useState(false);

    const[errorPopupVisible, setErrorPopup] = useState(false);


    const [Formdata, setFormdata] = useState({
        username:'',
        email:'',
        password:'',
        role:'user',
    });

     const resetForm = () => {
        setFormdata({
            username:'',
            email:'',
            password:'',
            role: '',
        })
    };



    const handleChange = (e) => {

        setFormdata({
            ...Formdata , [e.target.id] : e.target.value
        });

    };

    const handleSubmit = async(e) => {

        e.preventDefault();




        try{
            const cryptoKey = await cryptoEncrypt();

            const encryptedPassword = CryptoJS.AES.encrypt(Formdata.password,cryptoKey).toString();

            const data = {...Formdata,password: encryptedPassword}

            const response = await apiAxios.post(`/users/register`,data);

            if(response.status === 201) {
                resetForm();
                setPopupVisible(true);                
            } else {
                console.error('User creation failed:', error);
            }

        } catch(error){
           setErrorPopup(true);

            console.log("Error occured while creating User:", error);
        }

    };
    
    const closePopup = () => {
        setPopupVisible(false);
        setErrorPopup(false);
    };

    return(
        <div className="flex flex-col min-h-screen ">

        <Header/>

        <div className="flex flex-col flex-grow lg:flex-row lg:justify-evenly bg-rose-300 py-16 rounded-md">



            <form className="flex flex-col justify-center px-6 sm:px-40 lg:px-20 lg:w-[40rem] " onSubmit={handleSubmit}>

            <p className="font-quick text-3xl font-bold mb-10"> Create a new account</p>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> User Name </label>
            <input id="username" value={Formdata.username} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " onChange={handleChange} required></input>
            </div>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Email Address </label>
            <input id="email" type="email" value={Formdata.email} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " onChange={handleChange} required></input>
            </div>

            <div className="mb-10">
            <label className="font-quick text-lg font-bold "> Password </label>
            <input id="password" type="password" value={Formdata.password} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold" onChange={handleChange} required></input>
            </div>

            <NavLink to='/AdminSignup'> <span className="font-quick font-bold  hover:underline cursor-pointer ml-auto mb-2"> Create Admin Account ?</span> </NavLink>
           
            <button type="submit" className="w-full bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white "> Sign Up</button>

            <p className="font-quick font-semibold  mx-auto mt-2 "> Already Have an Account? <NavLink to="/"> <span className="font-quick font-bold hover:underline cursor-pointer">Log In.</span></NavLink></p>

            </form>  


            <img src={SignupImage} className="rounded-md shadow-md w-1/3 h-1/2 object-cover invisible lg:visible"/>



        </div>

        <div>
            {
                isPopupVisible && 
                    <Popup message="User Created Successfully" onClose={closePopup} />
                
            }

        </div>

        <div>
            {
                errorPopupVisible && 
                    <Popup message="Username or Email already exists." onClose={closePopup} />
                
            }

        </div>

        <Footer/>

        </div>
    );

};

export default Signup;