import { ADD_MEDICINE ,DELETE_MEDICINE ,UPDATE_MEDICINE ,DELETE_MEDICINE_ITEM } from '../actions/medicine';
import Medicine  from '../../models/Medicine';

const initialState = {
    medicineDetail: []
};


export default (state = initialState , action) => {

    switch(action.type) {
      
        case ADD_MEDICINE:
            const newMedicine = new Medicine(
                action.medicineData.patientId,
                action.medicineData.reasonId,
                action.medicineData.medicineId,
                action.medicineData.medicinedate,
                action.medicineData.medicineName,
                action.medicineData.medicineQty,
                action.medicineData.morning,
                action.medicineData.afternoon,
                action.medicineData.night,
                action.medicineData.beforemeal,
                action.medicineData.aftermeal
            );

            return {
                ...state,
                medicineDetail: state.medicineDetail.concat(newMedicine)

            };

         case DELETE_MEDICINE:    
           return{
               ...state,
               medicineDetail: []

           };
        case UPDATE_MEDICINE:
            const medicineIndex = state.medicineDetail.findIndex(
                data => data.medicineId === action.medicineId
            );
           
            const updatedMedicine = new Medicine(
                state.medicineDetail[medicineIndex].patientId,
                state.medicineDetail[medicineIndex].reasodId,
                action.medicineId,
                state.medicineDetail[medicineIndex].medicineDate,
                action.medicineData.medicineName,
                action.medicineData.medicineQty,
                action.medicineData.morning,
                action.medicineData.afternoon,
                action.medicineData.night,
                action.medicineData.beforeMeal,
                action.medicineData.afterMeal
            );

            const updatedMedicineData = [...state.medicineDetail];
            updatedMedicineData[medicineIndex] = updatedMedicine;
            return {
                ...state,
                medicineDetail:updatedMedicineData
            };

      case DELETE_MEDICINE_ITEM:
          return {
                 ...state,
                 medicineDetail:state.medicineDetail.filter(
                     data => data.medicineId !== action.medicineId
                 )
          };      

    }
    return state;

};