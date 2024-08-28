import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import getRoleFromToken from "./getRoleFromToken";

const userRole = (Component, allowedRoles) => {
  return (props) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchRole = async () => {
        try {
          const userRole = await getRoleFromToken();
          setRole(userRole);
        } catch (error) {
          console.error('Error fetching user role:', error);
          setRole('guest'); // Default to 'guest' on error
        } finally {
          setLoading(false);
        }
      };

      fetchRole();
    }, []);

    if (loading) {
      return <div>Loading...</div>; 
    }

    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/noAuth" />;
    }

    return <Component {...props} />;
  };
};

export default userRole;
