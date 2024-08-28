import apiAxios from "../services/api";

async function cryptoEncrypt() {
    
    try {
      const response = await apiAxios.get(`/users/getEncryptkey`);

      console.log("check response", response);
      
      if (response.status == 200) {
        const data = await response.data;
      console.log('checking how data is structured', data);
      const key = data.msgkey; 
      console.log('crypto ecnrypt recived key', key);
      return key;
      }
     else {
        throw new Error(`Failed to fetch encryption key: ${response.status}`);

      }
  
    } catch (error) {
      console.error('Error fetching or using key:', error);
     
    }
  }


  export default cryptoEncrypt;