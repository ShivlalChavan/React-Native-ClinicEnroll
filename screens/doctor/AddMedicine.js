import React, {useState,useCallback} from 'react';
import { View, Text ,StyleSheet ,ScrollView , Button , KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CheckBox from '@react-native-community/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import * as medicineActions from '../../store/actions/medicine';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import moment from 'moment';
import SnackBar from 'react-native-snackbar';


const AddMedicine = props => {

    const patientId = props.route.params.patientId;
    console.log("patientId ,InMedicine - "+patientId);

    const  [medicineName,setMedicineName] = useState('');
    const  [medicineQty, setMedicineQty]  = useState('');
    const  [morning , setMorning] = useState(false);
    const  [afternoon ,setAfterNoon] = useState(false);
    const  [night , setNight] = useState(false);
    const  [beforeMeal , setBeforeMeal] = useState(false);
    const  [afterMeal , setAfterMeal] = useState(false);
    const  [errorMsg , setErrorMsg] = useState('');

    const dispatch = useDispatch();


    const submitHandler = () => {

        console.log("in submit medicine");

        if(medicineName === ''){

            if(errorMsg ==='')
            {
                setErrorMsg('Please enter medicine name');
            }
        }

        if(medicineQty ===''){

            if(errorMsg ==='')
            {
                setErrorMsg('Please enter medicine quantity.');
            }
        }

         if(errorMsg ===''){

            var date = new Date();
        var converteddate = moment(date).format('DD/M/yyyy');
        const medicineId = Math.floor(Math.random() * 100) + 1;
        console.log("meicine name - "+medicineName+" qty -"+medicineQty);

        dispatch(medicineActions.createMedicine(patientId,'M5QSsewbH34neegDLtI',medicineId,converteddate,medicineName,medicineQty,morning,afternoon,night,beforeMeal,afterMeal)
        );

        props.navigation.goBack();

         }else {
                
            SnackBar.show({
               text:errorMsg,
               duration:SnackBar.LENGTH_SHORT
            });
            setErrorMsg('');
         }    
    };


    return (
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? "padding" : null} 
        style={{flex:1}}
        enabled
        >
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
                     value={morning}
                     onValueChange={setMorning}
                    />
                    <Text style={styles.checkLabel}>Morning.</Text>
                </View>
                <View style={styles.checkContainer}>
                   <CheckBox
                     value={afternoon}
                     onValueChange={setAfterNoon}
                    />
                    <Text style={styles.checkLabel}>Afternoon.</Text>
                </View>
                <View style={styles.checkContainer}>
                   <CheckBox
                     value={night}
                     onValueChange={setNight}
                    />
                    <Text style={styles.checkLabel}>Night.</Text>
                </View>
                <View style={styles.checkContainer}>
                   <CheckBox
                     value={beforeMeal}
                     onValueChange={setBeforeMeal}
                    />
                    <Text style={styles.checkLabel}>BeforeMeal.</Text>
                </View>
                <View style={styles.checkContainer}>
                   <CheckBox
                     value={afterMeal}
                     onValueChange={setAfterMeal}
                    />
                    <Text style={styles.checkLabel}>AfterMeal.</Text>
                </View>
                </View>
                <View style={styles.button}>
                    <Button
                    title="Submit"
                    onPress={submitHandler}
                    />
                </View>
              </View>    
          </ScrollView>  
          </KeyboardAvoidingView>
    );

};

export const screenOptions = navData => {
       
    return {
        headerTitle: "Add Medicine"
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

export default AddMedicine;