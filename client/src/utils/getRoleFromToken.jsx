import apiAxios from '../services/api';

const getRoleFromToken = async() => {

try {
    const response = await apiAxios.get(`/users/api/protected`);

        console.log("data", response.data);
        const role  = response.data.user.user.role;
        console.log('User role:', role);
        return role;

} catch(error) {
    console.error('Error fetching user role:', error);
        return 'guest';
   
};



};

export default getRoleFromToken;