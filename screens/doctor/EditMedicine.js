import React, {useState,useCallback} from 'react';
import { View, Text ,StyleSheet ,ScrollView , Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CheckBox from '@react-native-community/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import * as medicineActions from '../../store/actions/medicine';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import moment from 'moment';
import MedicineDetail from '../medical/MedicinesDetail';

const EditMedicine = props => {

   // const patientId = props.route.params.patientId;
    const medicineId = props.route.params.medicineId;

    console.log("patientId ,InMedicine - "+medicineId);

    const medicineDetail = useSelector(state => 
        state.medicine.medicineDetail.find(medicine => medicine.medicineId === medicineId)
        );

    const [medicineName , setMedicineName] = useState(medicineDetail ? medicineDetail.medicineName : '');
    const [medicineQty ,  setMedicineQty]  = useState(medicineDetail ? medicineDetail.medicineQty : '');
    const  [morning , setMorning] = useState(false);
    const  [afternoon , setAfterNoon] = useState(false);
    const  [night , setNight] = useState(false);
    const  [beforeMeal , setBeforeMeal] = useState(false);
    const  [afterMeal , setAfterMeal] = useState(false);
    const  [errorMsg , setErrorMsg] = useState('');
   

        //setMorning(medicineDetail.morningTime);

        //console.log('medicinedetail'+MedicineDetail.morning);

    const dispatch = useDispatch();


    const submitHandler = () => {
        
        if(medicineName ===''){

            if(errorMsg === '')
            {
                setErrorMsg('Please enter medicine name');
            }
        }

        if(medicineQty ===''){

            if(errorMsg === '')
            {
                setErrorMsg('Please enter medicine quantity.');
            }
        }

         if(errorMsg === ''){

        dispatch(medicineActions.updateMedicine(medicineId,medicineName,medicineQty,morning,afternoon,night,beforeMeal,afterMeal)
        );

        props.navigation.goBack();

         } else {
                
            SnackBar.show({
               text:errorMsg,
               duration:SnackBar.LENGTH_SHORT
            });

            setErrorMsg('');

         }

    };


    return (
          <ScrollView>
              <View style={styles.screen}>
                <Input
                id="medcicineName"
                 label="Medicine Name"
                 value={medicineName}
                 textChangeHandler={name => setMedicineName(name)}
                 errorText="Please enter medicine name"
                 keyboardType="default"
                 returnType="next"
                 required
                />
                <Input
                id="medicineQty"
                 label="Medicine Qty"
                 value={medicineQty}
                 textChangeHandler={quantity => setMedicineQty(quantity)}
                 errorText="Please enter medicine qty"
                 keyboardType="numeric"
                 returnType="done"
                 required
                />
                <View style={styles.checkLayout}>
                <View style={styles.checkContainer}>
                   <CheckBox
                     value={medicineDetail.morningTime}
                     onValueChange={setMorning}
                    />
                    <Text style={styles.checkLabel}>Morning.</Text>
                </View>
                <View style={styles.checkContainer}>
                   <CheckBox
                     value={medicineDetail.afternoonTime}
                     onValueChange={setAfterNoon}
                    />
                    <Text style={styles.checkLabel}>Afternoon.</Text>
                </View>
                <View style={styles.checkContainer}>
                   <CheckBox
                     value={medicineDetail.nightTime}
                     onValueChange={setNight}
                    />
                    <Text style={styles.checkLabel}>Night.</Text>
                </View>
                <View style={styles.checkContainer}>
                   <CheckBox
                     value={medicineDetail.beforeMeal}
                     onValueChange={setBeforeMeal}
                    />
                    <Text style={styles.checkLabel}>BeforeMeal.</Text>
                </View>
                <View style={styles.checkContainer}>
                   <CheckBox
                     value={medicineDetail.aftermeal}
                     onValueChange={setAfterMeal}
                    />
                    <Text style={styles.checkLabel}>AfterMeal.</Text>
                </View>
                </View>
                <View style={styles.button}>
                    <Button
                    title="Submit"
                    onPress={() => {
                        submitHandler();
                    }}
                    />
                </View>
              </View>    
          </ScrollView>  
        

    );

};

export const screenOptions = navData => {
       
    return {
        headerTitle: "Edit Medicine"
  };
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:20    
    },
    checkLayout:{
        flex:1,
        flexDirection:'column'

    },
    checkContainer:{
         flex:1,
         flexDirection: 'row'
    },
    checkLabel:{
        marginLeft:8,
        fontSize:14
    },
    button: {
        margin:20
    }

});

export default EditMedicine;