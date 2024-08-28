import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Access from "./pages/Access";
import Signup from "./pages/Signup";
import AdminSignup from "./pages/AdminSignup";
import userRole from "./utils/userRole";
import NotAuthorized from "./utils/NotAuthorized";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const AccessWithRole = userRole(Access, ['admin']);  

 function App() {

 

  return (
    <>

    <Router>
      <Routes>


        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/AdminSignup" element={<AdminSignup/>} />
        <Route path="/Access" element={<AccessWithRole />} />
        <Route path="/noAuth" element={<NotAuthorized />} />
        <Route path="/forgot-password" element= {<ForgotPassword/>} />
        <Route path="/reset-password/:token" element= {<ResetPassword/>} />

  

        


      </Routes>
      </Router>

     

   </>
  );

}; 

export default App;