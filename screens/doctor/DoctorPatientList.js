import React,{useState,useEffect,useCallback} from 'react';
import { View  , Text , StyleSheet, Platform ,FlatList, ActivityIndicator} from 'react-native';
import {HeaderButton ,Item, HeaderButtons} from 'react-navigation-header-buttons';
import { useSelector , useDispatch } from 'react-redux';
import * as patientActions from '../../store/actions/patient';
import * as reasonActions from '../../store/actions/reason';


import HeaderButon from '../../components/HeaderButton';

import API from '../../server/server';
import PatientModel from '../../models/PatientModel';
import PatientItem from '../../components/PatientItem';
import moment  from 'moment';
import Colors from '../../constants/Colors';


const DoctorPatientList = props => {

    const [isLoading , setIsLoading] = useState(false);
    const [patientdata , setPatientData] = useState([]);

    const patientDetails = useSelector(state => state.patient.patientData);
    const dispatch = useDispatch();

    const loadPatientData = useCallback(async () => {
        try{
             await dispatch(patientActions.fetchPatientData()); 
                                    
        } catch(error){
           console.log('in error =: '+error.message);
        }
        
    },[dispatch ,setIsLoading]);


    const loadReasonData = useCallback( async ()=>{
        try{
            await dispatch(reasonActions.fetchReasonList());

        }catch(error){
            console.log('in error reason =: '+error.message);
        }

    },[dispatch])



    const patientData=[];


    useEffect(()=>{
        setIsLoading(true);
        loadPatientData().then(() => {
            const result  = patientDetails.filter(function(data) {
                                        var date = new Date();
                                        var converteddate = moment(date).format('DD/M/yyyy');
                                       return data.apptDate === converteddate;
                                 });
               setPatientData(result);
            setIsLoading(false);
        });
        loadReasonData();
    },[dispatch ,patientDetails,loadReasonData]);

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

    const selectItemHandler = (item) => {
        console.log("id:-"+item.id);
        props.navigation.navigate('PatientPrescription',{
            patientId: item.pateintId,
            id:item.id
        })
    }

    if(patientdata.length>0){
        return (
            <FlatList
            data={patientdata}
            showsVerticalScrollIndicator={false}
            renderItem = {itemData =>(
                <PatientItem
                patientName={itemData.item.patientName}
                patientNumber={itemData.item.patientMobileNo}
                patientAge={itemData.item.patientAge}
                 onSelect={() => {
                    selectItemHandler(itemData.item)
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
        headerTitle:' Doctor Patient List',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButon}>
             <Item
            title="Menu"
             iconName={Platform.OS==='android' ? 'md-menu' : 'ios-menu'}
             onPress={() => {
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

export default DoctorPatientList;
