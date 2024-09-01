import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getRoleFromToken from "../utils/getRoleFromToken";
import InsertForm from "../components/InsertForm";



function Home() {

    // check user Role 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndNavigate = async () => {
            const role = await getRoleFromToken();
            if (role === 'user' || role === 'admin') {
                console.log("Welcome");
            } else {
                navigate('/');
            }
        };

        fetchAndNavigate();
    }, [navigate]);


  

    return (
        <div className=" bg-black">
        <Header/>
        <div className="flex flex-col min-h-screen ">
        <div className="flex flex-col justify-center items-center p-8">

        
        <h1 className=" text-xl text-center font-anta text-yellow-400 p-2  sm:text-3xl my-4 ">

            To do List

        </h1>
       

        <InsertForm  />
       
        </div>

        </div>

        
  
  














        
        </div>

    )
}

export default Home;
