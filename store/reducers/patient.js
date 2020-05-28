import { SET_PATIENT } from '../actions/patient';

const initialState = {
 patientData :[]
 
};


export default (state = initialState , action) => {

    switch(action.type) {
 
        case SET_PATIENT:  
        return {
                patientData : action.patientData

            };
    }
    return state;
}; 