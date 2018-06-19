import { Dimensions, Platform, AsyncStorage } from 'react-native';

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

export const navigatorDrawer = (event, $this)=>{
  if(event.type === 'NavBarButtonPress' && event.id === 'DrawerButton'){
    $this.props.navigator.toggleDrawer({
      side:'left',
      animated:true
    })
  }
}


export const getTokens = (cb) => {
  AsyncStorage.multiGet([
    '@sellitApp@token',
    '@sellitApp@refreshToken',
    '@sellitApp@expireToken',
    '@sellitApp@uid',
  ]).then(value=>{
    cb(value)
  })
}


export const setTokens = (values, cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
      ['@sellitApp@token',values.token],
      ['@sellitApp@refreshToken',values.refToken],
      ['@sellitApp@expireToken',expiration.toString()],
      ['@sellitApp@uid',values.uid],
    ]).then(response =>{
      cb();
    })
}
