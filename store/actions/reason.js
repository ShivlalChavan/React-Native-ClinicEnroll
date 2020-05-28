import Reason from '../../models/Reason';

export const SET_REASON = 'SET_REASON';


export const fetchReasonList = () => {

    return async (dispatch) => {

        try {
              
            const response = await fetch('https://clinic-enrollment.firebaseio.com/PatientData/reasonToMeet/reasonList.json');

            if(!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await  response.json();

            console.log("resdata"+resData);

            const reasonData = [];

            for(const key in resData) {
                reasonData.push(
                     new Reason(
                         resData[key].reasonId,
                         resData[key].pateingId,
                         resData[key].reasontoMeet,
                         resData[key].apptmtDate,
                         resData[key].checked,
                         keyid = key                        
                     )
                );
            }
            //console.log("data"+reasonData[32].reasontoMeet);
            dispatch({ type:SET_REASON , reasonData:reasonData});
             
        } catch(error){
             
            throw error;
        }
    };
};