import React ,{ useCallback,useEffect,useReducer, useState } from 'react';
import { View , 
         Text,
         StyleSheet ,
         KeyboardAvoidingView,
         Alert, 
         Button,
         ScrollView ,
          ActivityIndicator,
          TouchableOpacity,
         Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton  from '../../components/HeaderButton';
import SnackBar from 'react-native-snackbar';

import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import NetworkInfo  from '../../components/Connectivity';
import API from '../../server/server';
import PatientModel from '../../models/PatientModel';
import Reason from '../../models/Reason';

import DatePicker from '../../components/DatePicker';
import moment from 'moment';
import firebase from '../../databaseconfig/firebaseConfig';
import { firestore } from 'firebase';

const FORM_INPUT_UPDATE ='FORM_INPUT_UPDATE';




const AddPatient = props => {

    let  patientData; 

    const [patientName , setPatientName] = useState('');
    const [patientNo , setPatientNo] = useState('');
    const [age , setAge] = useState('');
    const [reason , setReason] = useState('');
    const [apptDate,setApptDate] = useState('');
    const [errorMsg , setErrorMsg] = useState('');
    const [isLoading ,setIsLoading] = useState(false);
    const [showDatePicker , setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));
 
   // const database  = firebase.firestore();

   

    

    

     const showDateTimePicker = () => {
        setShowDatePicker(true);
     }

    const getSelectedDate = (event ,selectedDate) => {

        const result= selectedDate;      
         console.log("selected Dtae = :"+result);
         setShowDatePicker(false);
         setDate(result);
         //setApptDate(result);
         

        
    };

    const formatDate = (inputDate) => {
        var converteddate = moment(inputDate).format('DD/M/yyyy'); 
        console.log("converted dat:- "+converteddate);
        
        return converteddate;
    }

    const savePatient = () => {
        console.log('In Save Patint');
    }

    const submitHandler = () => {

       // if(NetworkInfo.isConnected)

        if(patientName==='') {
            
            if(errorMsg=='')
            {
             setErrorMsg('Please enter patient Name');
            }
        }

        if(patientNo === '')
        {
            if(errorMsg===''){

            setErrorMsg('Please enter patient number');
            }
        }

        if(age === '')
        {
            if(errorMsg===''){
            setErrorMsg("Please enter patient age");
            }
        }

        

        if(reason === '')
        {
            if(errorMsg===''){
            setErrorMsg('Please enter reason to meet');
            }
        }

        

        if(errorMsg === '')
        {
            var converteddate = moment(date).format('DD/M/yyyy'); 
             console.log("converted dat:- "+converteddate);

            console.log("in save"+converteddate);
           setIsLoading(true);
            
             const  patientId = firebase.database().ref().push().key;
             
             const reasonId = firebase.database().ref().push().key;

            const patientObject = new PatientModel(
                                                   '',patientId,patientName,age,patientNo,reason,converteddate,false,false,'',false,false,'');
          
            
            
            //  API.clinicData.addPatient(patientObject)
            //                 .then(res=>res.json())
            //                 .then(response ={

            //                 }).catch((error)=>{
            //                     console.log('in error','list'+error)
            //                 })
            //                 .done(() =>{
            //                     setIsLoading(false);
            //                     props.navigation.goBack();
            //                 })


            // TODO: UNCOMMENT  below AFTER validation's test

            firebase.database().ref('PatientData/patientData/patientList')
            .push(patientObject).then(() =>{
                // setIsLoading(false);
                //        props.navigation.goBack();
            }).catch((error) => {

                console.log("ineroro "+error.message);
            });

            const reasonObject = new Reason(reasonId,patientId,reason,converteddate,false,'');

            firebase.database().ref('PatientData/reasonToMeet/reasonList')
             .push(reasonObject).then(()=>{

                setIsLoading(false);
                props.navigation.goBack();
             }).catch((error) =>{
                console.log("ineroro "+error.message);
             });


        }else
        {
          SnackBar.show({
             text:errorMsg,
             duration:SnackBar.LENGTH_SHORT
          });

          setErrorMsg('');
          
        }

        // if(!formState.formIsValid){
        //      Alert.alert('Wrong input','Please check errors in form',[
        //          {text:'okay'}
        //      ]);
        //    return;
        // }
      //  savePatient();

    };



    if(isLoading){
        return (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView        
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? "padding" : null} 
        style={{flex:1}}
        enabled
        >
        <ScrollView> 
        <View style={styles.form}>
            <Input
             label="Patient Name"
             value={patientName}
             textChangeHandler={(name) => {setPatientName(name)}}
             keyboardType="default"
             returnKeyType="next"
             
            />
             <Input
             label="Patient No"
             value={patientNo}
             errorText="Please enter Patient Number"
             keyboardType="numeric"
             returnKeyType="next"
             textChangeHandler={(no) => {setPatientNo(no)}}
              required
            />
             <Input
             id="age"
             label="Age"
             value={age}
             errorText="Please enter Patient Age"
             keyboardType="numeric"
             returnKeyType="next"
             textChangeHandler={(age) => {setAge(age)}}
              required
            />
             <Input
             id="reasonToMeet"
             label="Reason"
             value={reason}
             errorText="Please enter reason"
             keyboardType="default"
             autoCapitalize="sentences"
             returnKeyType="next"
             textChangeHandler={(reason) => {setReason(reason)}}
              required
            />
            <View style={styles.date}>
            <Text styles={{marginBottom:20}}>Date:</Text>
              <TouchableOpacity styles={{marginTop:20}} onPress={showDateTimePicker}>  

              <Text styles={{marginTop:20}}>{formatDate(date)}</Text> 
              
              </TouchableOpacity>
              {showDatePicker && (
                  <DatePicker
                  minimumDate={new Date(Date.now())}
                  display='default'
                  value={date}
                  onChange={getSelectedDate}
                  />
              )}
            </View>
            <View style={styles.buttonAdd}>
            <Button 
            title="Add Appointment"
            color={Colors.primary}
            onPress={submitHandler}
            />
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
       
     );
           //new Date(Date.now())
};

export const screenOptions = navData => {
  
    return {
       headerTitle: 'Add Patient'
    };
};

const styles = StyleSheet.create({

    form:{
       margin:20,
       alignContent:'center'
    },
    buttonAdd:{
    margin:20
    }, 
    screen:{
        flex:1,
        justifyContent:'center'
    },
    date:{
        marginTop:20,
        marginBottom:20,
        marginRight:60,
        borderBottomColor: Colors.lightgrey,
        borderBottomWidth: 1
    },



});

export default AddPatient;