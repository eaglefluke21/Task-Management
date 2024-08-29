import React from "react";
import { useState } from "react";
import {useParams} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Popup from "../components/Popup";
import ResetPasswordImage from "../assets/login.jpg"
import apiAxios from "../services/api";

const ResetPassword = () => {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const[isPopupVisible , setPopupVisible] = useState(false);

   

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{


            const data = {password}

            const response = await apiAxios.post(`/users/reset-password/${token}`,data);

            if(response.status === 201) {
                setPassword('');
                setPopupVisible(true);                
            } else {
                console.error('Reset password failed:', error);
            }


        } catch(error){
        
            console.log('Error Reseting Email ',error);

        }
    };
    const closePopup = () => {
        setPopupVisible(false);
    };




return (
    // <div>
    //     <p> Reset Password</p>
    //     <form onSubmit={handleSubmit}>
    //         <label>
    //             New Password:
    //             <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}
    //             required
    //             />
    //         </label>
    //         <button type="submit">Reset Password</button>
    //     </form>

    //     {message && <p> {message}</p>}

    // </div>

    <div className="flex flex-col min-h-screen ">

<Header/>

<div className="flex flex-col flex-grow lg:flex-row lg:justify-evenly bg-cyan-300 py-16 rounded-md">



    <form className="flex flex-col justify-center px-6 sm:px-40 lg:px-20 lg:w-[40rem] " onSubmit={handleSubmit}>

    <p className="font-quick text-3xl font-bold mb-10"> Set New Password ?</p>

   

    <div className="mb-10">
    <label className="font-quick text-lg font-bold "> New Password </label>
    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="w-full border-gray-700  border rounded-md py-1 font-quick ps-4 font-semibold " ></input>
    </div>


  

    <button type="submit" className="w-full bg-black rounded-md py-1.5 font-quick font-semibold shadow-sm shadow-black text-white "> Create New Password</button>

    

    </form>  


    <img src={ResetPasswordImage} className="rounded-md shadow-md  w-1/3 h-1/2 object-cover invisible lg:visible"/>



</div>

<div>
{
                isPopupVisible && 
                    <Popup message="Password reset succesfull " onClose={closePopup} />
                
            }

</div>

<Footer/>

</div>



);
};

export default ResetPassword;