import Header from "../components/Header";
import Footer from "../components/Footer";

const Access= () => {

   



    return (
        <div className=" bg-green-500 flex flex-col min-h-screen ">

            <Header/>


            <div className=' flex flex-col flex-grow justify-center items-center   '>
      <h1 className='text-white font-quick  sm:text-3xl text-xl font-bold'>Admin Page.</h1>
    

      
    </div>

           

            <Footer/>


        </div>
    );
};

export default Access;