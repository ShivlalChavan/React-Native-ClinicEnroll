import React,{useState,useEffect,useCallback} from 'react';
import {View, StyleSheet,Platform,Text,ActivityIndicator, FlatList,TextInput} from 'react-native';

import { HeaderButtons ,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import Colors from '../../constants/Colors';

import API from '../../server/server';
import PatientModel from '../../models/PatientModel';
import PatientItem from '../../components/PatientItem';
import moment  from 'moment';



const PatientList = props => {
     const [isLoading ,setIsLoading] = useState(false);
     const [patientdata , setPatientData] = useState([]);
     const [tempPatientData , setTempPatientData] =useState([]);
     const [seachPatient , setSearchPatient] = useState('');


     const patientData=[];
     
     const loadPatientData = () => {
        setIsLoading(true);
        
        API.clinicData.getPatient()
              .then((response) => {
                 if(!response.ok) throw Error(response.statusText || response.json)
                 setIsLoading(false);
                 return response.json();
              })
              .then((responseData) =>{

               // patientData = responseData
                const loadData =[];
                 
              const  resData = responseData;
                // eslint-disable-next-line space-infix-ops
                console.log('response :-'+resData);

                for(const key in responseData){
                       
                    console.log("key =: "+key);
                    
                    patientData.push(
                        new PatientModel(
                            id=key,
                            responseData[key].pateintId,
                            responseData[key].patientName,
                            responseData[key].patientAge,
                            responseData[key].patientMobileNo,
                            responseData[key].reasonId,
                            responseData[key].apptDate,
                            responseData[key].isPrescribed,
                            responseData[key].isTakenMedicine,
                            responseData[key].comment,
                            responseData[key].bloodTest,
                            responseData[key].isDocumentAdded,
                            responseData[key].labTestType
                        )
                    );
                    
                }
                 console.log("List =-"+patientData);
                 console.log('Size'+patientData[0].id)

           
            
                setIsLoading(false);

              }).catch((error)=>{
                  console.log('in error','list'+error)
              })
              .done(() =>{

                console.log("inside done");

       const result   = patientData.filter(function(data) {
                     var date = new Date();
                     var converteddate = moment(date).format('DD/M/yyyy');
                    return data.apptDate === converteddate;
              });

                 setPatientData(result);
                 setTempPatientData(result);
                // console.log('Patient filter'+result[0].apptDate)
                  setIsLoading(false);
              }) 
     }

     const searchFilterPatient = (text) => {

        if(text === ''){
            const data = [...tempPatientData];
            setPatientData(data); 
            setSearchPatient('');
            return;
          }

        const resultData = patientdata.filter(function(item) {
              
           const itemData = item.patientName ? item.patientName.toUpperCase() : ''.toUpperCase();
           const textData = text.toUpperCase();
           return itemData.indexOf(textData) > -1;
        });
        if(resultData.length >= 0){
           
            setPatientData(resultData);
            setSearchPatient(text);
        } else{ 
            
        } 
        
     };

    
   useEffect(()=> {
    
   
    loadPatientData();         
   },[]);
 
    const selectItemHandler = (id) =>{
        props.navigation.navigate('AddPatient',{
            productId:id
        });
    };
 
    if(isLoading){
        return (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        );
    }

    if(patientdata.length === 0)
    {
        return (
            <View style={styles.centered}>
             <Text>No Appoinment Found!</Text>
            </View>
        );
    }

    if(patientdata.length>0){
        return (
            <View style={styles.mainContainer}>
               <TextInput
                style={styles.textInputStyle}
                placeholder="Search Patient"
                value={seachPatient}
                onChangeText={text => searchFilterPatient(text)}                 
               /> 

            <FlatList
            data={patientdata}
            keyExtractor={(item, index) => item.key}
            showsVerticalScrollIndicator={false}
            renderItem = {itemData =>(
                <PatientItem
                patientName={itemData.item.patientName}
                patientNumber={itemData.item.patientMobileNo}
                patientAge={itemData.item.patientAge}
                 onSelect={() => {
                    //selectItemHandler(itemData.item)
                    console.log('itemclick'+itemData.item.id);
                 }}
                />
            )}
            />
            </View>
         );
    }
    

};

export const screenOptions = navData => {
    return {
        headerTitle: 'Patient List',
        headerLeft : () => (
             <HeaderButtons HeaderButtonComponent={HeaderButton}>
               <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' :'ios-menu'}
                onPress ={() =>{
                    navData.navigation.toggleDrawer();
                }}
               />   
             </HeaderButtons>
        ),
        headerRight : () =>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                 title="Add"
                 iconName={Platform.OS === 'android' ? 'ios-add' :'ios-add'}
                 onPress={ () =>{
                     navData.navigation.navigate('AddPatient')
                 }}
                />
            </HeaderButtons>  
        )
    };
};

const styles = StyleSheet.create({

    screen:{
        flex:1,
        justifyContent:'center'
    },
    centered: {   
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center' 
      },
      textContainer:{
           flex:1,
           justifyContent:'center'
      },
      text:{
          fontSize:12,
          color:'black'
      },
      mainContainer: {
          justifyContent:'center',
          flex:1,
          margin:5
      },
      textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: Colors.lightgrey,
        backgroundColor: '#FFFFFF',
      }
});


export default PatientList;
