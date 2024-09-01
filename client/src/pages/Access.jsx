import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import getRoleFromToken from "../utils/getRoleFromToken";


const Access= () => {

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
        <div className=" bg-black flex flex-col min-h-screen ">

            <Header/>


            <div className=' flex flex-col flex-grow justify-center items-center   '>
      <h1 className='text-white font-quick  sm:text-3xl text-xl font-bold'>Admin Page.</h1>
    

      
    </div>

           

            <Footer/>


        </div>
    );
};

export default Access;