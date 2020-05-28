export const BASE_URL ='https://clinic-enrollment.firebaseio.com/PatientData/';

export default {
   
    clinicData: {
        getPatient : function() {
        
            let url = `${BASE_URL}patientData/patientList.json`,
             opt = {
                 method:'get',
                 headers: {
                    'Content-Type': 'application/json'
                  }
             }   
             return fetch(url,opt);
        },
      addPatient:function(data) {

          let url = `${BASE_URL}patientData/patientList.json`,
          opt = {
              method:'post',
              body: JSON.stringify(data),
              headers: {
                  'Content-Type':'application/json'
              }
          };
          return fetch(url,opt);
      },
      getReason:function() {

        let url = `${BASE_URL}reasonToMeet/reasonList.json`,
         opt = {
             method:'GET',
             headers: {
                 'Content-Type':'application/json'
            }
         };
         return fetch(url,opt);
      }
    }
};