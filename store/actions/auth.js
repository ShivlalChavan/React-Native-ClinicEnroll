import  AsyncStorage  from "@react-native-community/async-storage";

export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const LOGIN_NAVIGATOR = 'LOGIN_NAVIGATOR';


export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
  };

export const authenticate = (userId ,emailId) => {
    return dispatch => {
          dispatch({type: AUTHENTICATE, userId: userId , emailId: emailId});
    };
};

export const setNavigator = (navigator) => {
    return dispatch => {
    dispatch({type: LOGIN_NAVIGATOR , navigator: navigator});

    };
};


export const login = (email,password) => {
    return async dispatch  => {  
    const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3UGIMqtCklODwfUajkc_bW39DEfQZoJI',
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        }
    );

    if(!response.ok){
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
       
        console.log('in error'+errorResData.error.message);
        let message = 'Something went wrong';

        if(errorId === 'EMAIL_NOT_FOUND'){
            message = 'This email could not be found!';
        }else if(errorId === 'INVALID_PASSWORD'){
            message = 'Please enter valid password!';
        }
        throw new Error(message);
    }

    const resData = await response.json();
    console.log("in Login REs "+resData.localId+"\\"+resData.email);
   
    const navigator = 'MedicalDrawerNavigator';
    // dispatch(setNavigator(navigator));

    dispatch(authenticate(resData.localId, resData.email));
   saveDataToStorage(resData.localId, resData.email);

       
//    if(resData.email === "doctor@gmail.com")
//         {
//             console.log("in setDispatch nav");
//             const navigator = 'MedicalDrawerNavigator';
//             dispatch(setNavigator(navigator));
//         }

  };
};

const saveDataToStorage = (userId, emailId) => {
    AsyncStorage.setItem('userData', 
    JSON.stringify({
        userId: userId,
        emailId:emailId
    })
    );
};



export const logout = () => {
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
} 