import React,{useEffect, useState, useCallback} from 'react';
import {View, StyleSheet ,Text ,ScrollView,Button,FlatList,ActivityIndicator} from 'react-native';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import * as medicineActions from '../../store/actions/medicine';
import MedicineItem from '../../components/MedicineItem';
import Colors from '../../constants/Colors';

import firebase from '../../databaseconfig/firebaseConfig';
import { firestore } from 'firebase';

import moment from 'moment';


const PatientPrescription = props => {

    const patientId = props.route.params.patientId;
    const id = props.route.params.id;
    
   // console.log("patienId - "+patientId+"// id -"+id);

    const [reasonToMeet, setReasonToMeet] = useState('');
    const [reasonDetail,setReasonToMeetDetail] = useState([]);
    const [medicineDataa , setMedicineDataa] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
            
           var date = new Date();
            const converteddate = moment(date).format('DD/M/yyyy');
            //console.log("apptmdatev "+converteddate);


    // const selctedReason = useSelector(state => 
    //     state.reason.reasonData.find(reason => reason.pateingId === patientId && reason.apptmtDate === converteddate));

    //     setReasonToMeet(selctedReason.reasontoMeet);
    
    // const selectedPatient = useSelector(state => 
    //     state.patient.patientData.find(patient => patient.id === id)
    //     );

    // const medicineData = useSelector(state => state.medicine.medicineDetail);


     const {selctedReason,selectedPatient,medicineData} = useSelector(state => ({
        selctedReason:state.reason.reasonData.find(reason => reason.pateingId === patientId && reason.apptmtDate === converteddate),
        selectedPatient :state.patient.patientData.find(patient => patient.id === id),
        medicineData:state.medicine.medicineDetail
     }),shallowEqual);

     //setMedicineDataa(medicineData);
      //setReasonToMeet(selctedReason.reasonToMeet);
      //console.log("medicine detail"+selctedReason.reasontoMeet);
       const dispatch = useDispatch();
     

   // const data = medicineData.json();
   // console.log("medicine detail"+medicineData[0].medicineId);

    // useEffect(()=>{
    //       setMedicineDataa(medicineData);
    // },[]);

     const onEditClickhandler = (item) => {
         props.navigation.navigate('EditMedicine',{
             medicineId:item.medicineId
         });
     }; 

     const onDeleteClickHandler = (item) => {

          dispatch(medicineActions.deleteMedicineItem(item.medicineId));
     };

    const submitPatientPrescription = async ()  => {
    
        setIsLoading(true);
      
        selectedPatient.isPrescribed = true;
        selectedPatient.bloodTest = true;

       await firebase.database().ref(`PatientData/patientData/patientList/${selectedPatient.id}`)
         .set(selectedPatient).then(() =>{
            //setIsLoading(false);
                  // props.navigation.goBack();
                  
        }).catch((error) => {

            console.log("ineroro "+error.message);
        })
   

      await  firebase.database().ref('PatientData/patientMedicine')
        .push(medicineData).then(() =>{

            dispatch(medicineActions.deleteMedicineArray());
            setIsLoading(false);
                   props.navigation.goBack();

        }).catch((error) => {

            console.log("ineroro "+error.message);
        })
    };

     if(isLoading)
     {
         return (
             <View style={{flex:1}}>
             <ActivityIndicator
              size="large"
              color={Colors.primary}
             />
             </View>
         )
     };

    return (
        <View style={styles.screen}>
          <View style={styles.patientLayout}>
             <View>
                <View style={styles.text}>
                  <Text>Patient Name:</Text>  
                   <Text>{selectedPatient.patientName}</Text>
                </View>
                <View style={styles.text}>
                  <Text>Patient Number:</Text>  
                   <Text>{selectedPatient.patientMobileNo}</Text>
                </View>
                <View style={styles.text}>
                  <Text>Patient Age:</Text>  
                   <Text>{selectedPatient.patientAge}</Text>
                </View>
                <View style={styles.text}>
                  <Text>Patient Reason:</Text>  
                   <Text>{selctedReason.reasontoMeet}</Text>
                </View>
            </View>
           <View>           
            <Text>Patient prescriptio List </Text>           
            </View>
             <View style={styles.buttonAdd}>
            <Button
             title="Click"
             onPress={()=>{
                 props.navigation.navigate('AddMedicine',{
                     patientId:patientId
                 });
             }}
            />
            </View>
          </View>
            <View style={styles.list}>
            <FlatList
            data={medicineData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem = {itemData =>(
             <MedicineItem
             medicineName={itemData.item.medicineName}
             medicineQty={itemData.item.medicineQty}
             onEdit={()=>
                { console.log("onEditClick"+itemData.item.medicineId);
                onEditClickhandler(itemData.item);
            }}
             Delete={()=> {

                console.log("ondeleteClick");
                onDeleteClickHandler(itemData.item);
             }}
             />
            )}        
            />
            </View>
            
            <View style={styles.submitContainer}>
                <View style={styles.buttonAdd}>
                   <Button
                     title="Submit"
                      onPress={()=>{
                          console.log("onSubmit click")
                          submitPatientPrescription();
                      }} 
                   /> 
                </View>

            </View>
        </View>
     );

};


export const screenOptions = navData => {
      
    return {
          headerTitle: "Prescription"
    };
};

const styles = StyleSheet.create({

    screen:{
        flex:1,
        justifyContent:'center'
    },
    buttonAdd:{
        margin:20
        },
        patientLayout:{
          flex:3
        },
        list:{
        margin:10,    
         flex:1.4
        },
        submitContainer:{
            flex:0.6
        },
        text:{         
        marginTop:10,
        marginBottom:10,
        marginLeft:20,
        marginRight:20,
        borderBottomColor: 'black',
        borderBottomWidth: 1

        }
});


export default PatientPrescription;
