export const ADD_MEDICINE = 'ADD_MEDICINE';
export const  DELETE_MEDICINE = 'DELETE_MEDICINE';
export const UPDATE_MEDICINE = 'UPDATE_MEDICINE';
export const DELETE_MEDICINE_ITEM = 'DELETE_MEDICINE_ITEM';

export const createMedicine = (patientId,reasonId,medicineId,medicinedate,medicineName,medicineQty,morning,afternoon,night,beforemeal,aftermeal) => { 

    return {
        type: ADD_MEDICINE ,
        medicineData: {
            patientId,
            reasonId,
            medicineId,
            medicinedate,
            medicineName,
            medicineQty,
            morning,
            afternoon,
            night,
            beforemeal,
            aftermeal
        }
    };
};

export const updateMedicine = (medicineId,medicineName,medicineQty,morning,afternoon,night,beforeMeal,afterMeal) => {
    return {
        type:UPDATE_MEDICINE,
        medicineId:medicineId,
        medicineData:{
            medicineName,
            medicineQty,
            morning,
            afternoon,
            night,
            beforeMeal,
            afterMeal

        }
    };
};

export const deleteMedicineItem = (medicineId) => {
    return {
        type:DELETE_MEDICINE_ITEM,
        medicineId:medicineId
    };

};

export const deleteMedicineArray = () => {

    return {
        type:DELETE_MEDICINE,
    };
}; 