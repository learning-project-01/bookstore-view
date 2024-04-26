// Import Axios library
import axios from "axios";


const headers = {
    'Content-Type': 'application/json', // Specify the content type if needed
  };

function getHeaders() {
  let requestHeaders = { ...headers };
  if (localStorage.getItem("token")) {
    requestHeaders = {
      "X-AUTH-TOKEN": localStorage.getItem("token"),
      ...headers,
    };
  }
  console.log("headers: ", requestHeaders);
  return requestHeaders;
}

function invoke(method, url, data, onSuccess, onError){
  const requestHeaders = getHeaders();
  console.log('requestHeaders: ', requestHeaders);

  let promise = null;

  switch(method){
    case "post":
      promise = axios.post(url, data, {headers:requestHeaders})
      break
    case "get":
      promise = axios.get(url, {headers: requestHeaders})
      break
    default:
      console.log(`http method ${method} implementation not found.`);  
  }

  if(promise){
    promise
    .then(response=>{
      if (onSuccess) {
        onSuccess(response);
      }
      console.log("Response:", response.data);
    })
    .catch(error=>{
      if(error?.response?.status===401){
        window.location.href="/login"
        return;
      }
      if (onError) {
        onError(error);
      }
      console.log({...error});
      console.error("Error:", error);
    })
  }
}

export function post(url, data, onSuccess, onError) {
  invoke("post", url, data, onSuccess, onError);
}

export function get(url, onSuccess, onError){
  invoke("get", url, {}, onSuccess, onError);
}
