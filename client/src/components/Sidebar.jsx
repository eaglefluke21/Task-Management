import React, {  useEffect, useRef } from "react";


const Sidebar = ({isNavVisible, sidebarRef}) => {



  return (
    <div>
      

      <nav  ref={sidebarRef} className={`absolute top-20 left-0 z-10 h-full w-48 sm:w-[30rem] lg:w-[50rem]  bg-white font-anta font-bold rounded-r-lg transition ease-in-out delay-500 transform ${isNavVisible ? '' : '-translate-x-full'} `}  >
       
      </nav>

    </div>







  );
};

export default Sidebar;
