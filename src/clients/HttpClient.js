// Import Axios library
import axios from "axios";


const headers = {
    'Content-Type': 'application/json', // Specify the content type if needed
  };

export function post(url, data, onSuccess, onError) {
  axios
    .post(url, data, {headers})
    .then((response) => {
      if (onSuccess) {
        onSuccess(response);
      }
      console.log("Response:", response.data);
    })
    .catch((error) => {
      // Handle errors
      if (onError) {
        onError(error);
      }
      console.error("Error:", error);
    });
}

export function get(url, onSuccess, onError){
    axios.get(url, {headers})
    .then(response=>{
        if(onSuccess){
            onSuccess(response)
        }
    }).catch(error=>{
        if(onError){
            onError(error)
        }
    })
}
