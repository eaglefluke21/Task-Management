
import InsertForm from "../components/InsertForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import getRoleFromToken from "../utils/getRoleFromToken";



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
        <>
        <Header/>
        <div className="flex flex-col min-h-screen  bg-purple-500">

           

            <div className="flex flex-col justify-center items-center p-8">

        <h1 className=" text-xl text-center font-anta text-white p-2  sm:text-3xl  ">

            To do List

        </h1>


        <InsertForm />
       
        </div>






        </div>
        <Footer/>
        </>

    )
}

export default Home;
