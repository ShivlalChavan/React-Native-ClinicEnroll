import React ,{useEffect,useState} from 'react';
import { View  , Text , StyleSheet, Platform ,FlatList, ActivityIndicator} from 'react-native';
import { HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import API from '../../server/server';
import PatientModel from '../../models/PatientModel';
import PatientItem from '../../components/PatientItem';
import moment  from 'moment';
import Colors from '../../constants/Colors';





const MedicinePatientList = props => {

    const [isLoading , setIsLoading] = useState(false);
    const [patientdata , setPatientData] = useState([]);

    const patientData=[];

    const loadPatientData = () => {

        API.clinicData.getPatient().
                       then((response) => {
                         if(!response.ok) throw Error(response.statusText || response.json)
                          setIsLoading(false); 
                         return response.json();
                       }).then((responseData)=>{

                        const loadData =[];
                 
                        const  resData = responseData;
                          // eslint-disable-next-line space-infix-ops
                          console.log('response :-'+resData);
          
                          for(const key in responseData){
                             
                              patientData.push(
                                  new PatientModel(
                                      responseData[key].id,
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
                    }).done(() =>{

                        const result   = patientData.filter(function(data) {
                            var date = new Date();
                            var converteddate = moment(date).format('DD/M/yyyy');
                           return data.apptDate === converteddate;
                     });

                        setPatientData(result);
                       // console.log('Patient filter'+result[0].apptDate)
                         setIsLoading(false);
                    })
    };

    useEffect(()=>{
        setIsLoading(true);
        loadPatientData();
    },[patientdata.length]);

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
                    console.log('itemclick')
                 }}
                />
            )}
            />
         );
    }

};

export const screenOptions = navData => {
    return{
        headerTitle:'Medicine Patient List',
        headerLeft : () => (
             <HeaderButtons HeaderButtonComponent={HeaderButton}>
                 <Item
                   title="Menu"
                   iconName={Platform.OS=== 'android' ? 'md-menu' : 'ios-menu'}
                   onPress={ () => {
                       navData.navigation.toggleDrawer();
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
      }

});

export default MedicinePatientList; 