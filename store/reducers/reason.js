import {SET_REASON}  from '../actions/reason';


const initialState = {
    reasonData:[]
};


export default (state = initialState, action) => {

    switch(action.type){

        case SET_REASON:
            return {
                reasonData:action.reasonData

            };
    }
    return state;
};
