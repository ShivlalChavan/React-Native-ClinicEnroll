import PatientModel  from '../../models/PatientModel';

export const SET_PATIENT = 'SET_PATIENT';

export const fetchPatientData = () => {

    return async (dispatch) => {

        try {

            const response = await fetch('https://clinic-enrollment.firebaseio.com/PatientData/patientData/patientList.json');

            if(!response.ok) {
                
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            
            const patientData = [];

            for(const key in resData){                             
                patientData.push(
                    new PatientModel(
                        id=key,
                        resData[key].pateintId,
                        resData[key].patientName,
                        resData[key].patientAge,
                        resData[key].patientMobileNo,
                        resData[key].reasonId,
                        resData[key].apptDate,
                        resData[key].isPrescribed,
                        resData[key].isTakenMedicine,
                        resData[key].comment,
                        resData[key].bloodTest,
                        resData[key].isDocumentAdded,
                        resData[key].labTestType
                    )
                );                             
            }
              //console.log("patientdata"+patientData.isTakenMedicine+"//"+patientData.isPrescribed);
             dispatch({type: SET_PATIENT , patientData : patientData});

        }
        catch (error){

           throw error;
        }
    };

};