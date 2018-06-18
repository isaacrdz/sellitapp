import { Dimensions, Platform } from 'react-native';

export const APIKEY = `AIzaSyCShh-Uy0mKKjKF9ZNAcMWDBCTaliqPfp8`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN= `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const getOrientation = (value) => {
  return Dimensions.get("window").heigth > value ? "portrait" : "landscape"
}

export const setOrientationListener = (cb)=>{
  return Dimensions.addEventListener("change", cb)
}


export const removeOrientationListener = ()=>{
  return Dimensions.removeEventListener("change")
}

export const getPlatform = ()=>{
  if(Platform.OS === "ios"){
    return "ios"
  } else {
    return "android"
  }
}
