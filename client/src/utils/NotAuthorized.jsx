import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer  from '../components/Footer';

const NotAuthorized = () => {
  const navigate = useNavigate();

  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/home');
    }, 2000); 

   
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (

    
<div className=" bg-pink-700 flex flex-col min-h-screen ">

<Header/>


<div className=' flex flex-col gap-4 justify-center items-center flex-grow  '>
<h1 className='text-white font-quick  sm:text-3xl text-xl font-bold'>Not Authorized</h1>
<p className='text-white font-quick text-xl'> Admin Only Page</p>
</div>



<Footer/>

</div>
  );
};

export default NotAuthorized;