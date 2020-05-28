import { LOGIN ,AUTHENTICATE , SET_DID_TRY_AL , LOGOUT ,LOGIN_NAVIGATOR}  from '../actions/auth';
import { ClinicNavigator } from '../../navigation/ClinicNavigator';

const initialState = {
    userId: null,
    emailId:null,
    navigator:'ClinicNavigator',
    didTryAutoLogin: false
};


export default (state = initialState, action) =>{
    
    switch (action.type) {
        case AUTHENTICATE:
           let stateNavigator;
           if(action.emailId === 'doctor@gmail.com')
           {
            stateNavigator = 'ClinicNavigator'; 
           }
           else if(action.emailId === 'reception@gmail.com')
           {
            stateNavigator = 'MedicalDrawerNavigator'; 
           }
           else if (action.emailId === 'laboratory@gmail.com'){
              
            stateNavigator = 'LabDrawerNavigator';
           }
           else {
            stateNavigator = 'ClinicNavigator'; 
           }
            return {
               userId: action.userId,
               emailId:action.emailId,
               didTryAutoLogin: true,
               navigator:stateNavigator
             };
           case SET_DID_TRY_AL:
             return {
               ...state,
               didTryAutoLogin: true
             };
            case LOGIN_NAVIGATOR:
              return {
                 ...state.navigator,
                 navigator: action.navigator
              }; 
         case LOGIN:  
         return {
             userId:action.userId,
             didTryAutoLogin: true
         };
         case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      };

        default:
            return state;
    }
};