import React from 'react';
import Logo from './Logo';
import Nav from './Nav';

const Header = () => {
    
    return (
        <>
            <header className=" bg-white top-0 z-[20] mx-auto flex  w-full items-center justify-center flex-wrap py-4">

                  <Logo/>
                    
                    <Nav/>

            </header>
        </>
    )
}

export default Header;