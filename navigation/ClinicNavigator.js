import React from 'react';
import { useDispatch } from 'react-redux';
import {Platform, SafeAreaView, Button, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import DoctorPatientList ,{screenOptions as DoctorScreenOptions} from '../screens/doctor/DoctorPatientList';
import PatientPrescription ,{ screenOptions as PatientPrescriptionScreenOptions} from '../screens/doctor/PatientPrescription';
import AddMedicine ,{screenOptions as AddMedicineOptions} from '../screens/doctor/AddMedicine';
import EditMedicine , {screenOptions  as EditScreenOptions} from '../screens/doctor/EditMedicine';

import AddPatient ,{screenOptions as AddPatientScreenOptions} from '../screens/reception/AddPatient';
import PatientList ,{screenOptions as PatientListScreenOptions} from '../screens/reception/PatientList';
import LoginScreen , { screenOptions as LoginScreenOptions} from '../screens/auth/Login';

import MedicinePatientList,{screenOptions  as MedicinePatientListOptions} from '../screens/medical/MedicinePatientList';
import MedicineDetail,{screenOptions as MedicineDetailOptions} from '../screens/medical/MedicinesDetail';

import LabPatientList ,{screenOptions as LabScreenOptions} from '../screens/laboratory/LabPatientList';
import UploadPatientDocument , {screenOptions as UploadScreenOptions} from '../screens/laboratory/UploadPatientDocument';  

import StartScreen  from '../screens/splashscreen/StartScreen';
import Colors from '../constants/Colors';
import Icon  from 'react-native-vector-icons/Ionicons';

import * as authActions from '../store/actions/auth';



const defaultNavOptions = {
    headerStyle:{
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''

    },
    headerTintColor : Platform.OS === 'android' ? 'white' : Colors.primary
}; 


 const ReceptionStackNavigator = createStackNavigator();

export const ReceptionNavigator = () => {
    return (
        <ReceptionStackNavigator.Navigator screenOptions={defaultNavOptions}>
           <ReceptionStackNavigator.Screen
             name="PatientList"
             component={PatientList}
             options={PatientListScreenOptions}
            />
            <ReceptionStackNavigator.Screen
             name="AddPatient"
             component={AddPatient}
              options={AddPatientScreenOptions}
            />
        </ReceptionStackNavigator.Navigator>
    );
 };

 const DoctorStackNavigator = createStackNavigator();

export const DoctorNavigator = () => {
    return(
        <DoctorStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <DoctorStackNavigator.Screen
            name="DoctorPatient"
            component={DoctorPatientList}
            options={DoctorScreenOptions}
            />
           <DoctorStackNavigator.Screen
            name="PatientPrescription"
            component={PatientPrescription}
            options={PatientPrescriptionScreenOptions}
           />
           <DoctorStackNavigator.Screen
           name="AddMedicine"
           component={AddMedicine}
           options={AddMedicineOptions}
           />
           <DoctorStackNavigator.Screen
           name="EditMedicine"
           component={EditMedicine}
           options={EditScreenOptions}
           />
        </DoctorStackNavigator.Navigator>
    );
 };

 const MedicalStackNavigator = createStackNavigator();

 export const MedicalNavigator = () => {
   
    return (
          <MedicalStackNavigator.Navigator screenOptions={defaultNavOptions}>
              <MedicalStackNavigator.Screen
              name="MedicinePatientList"
              component={MedicinePatientList}
              options={MedicinePatientListOptions}
              />
              <MedicalStackNavigator.Screen
               name="MedicineDetail"
               component={MedicineDetail}
               options={MedicineDetailOptions}
               />
          </MedicalStackNavigator.Navigator>
    );
 }; 
  
const LabStackNavigator = createStackNavigator();

export const LabNavigator = () => {
     
    return (
          <LabStackNavigator.Navigator screenOptions={defaultNavOptions}>
              <LabStackNavigator.Screen
              name="LabPatient"
              component={LabPatientList}
              options={LabScreenOptions}
              />
              <LabStackNavigator.Screen
              name="UploadDocument"
              component={UploadPatientDocument}
              options={UploadScreenOptions} 
              />              
          </LabStackNavigator.Navigator>
    );
  };


const LabDrawer = createDrawerNavigator();

export const LabDrawerNavigator = () => {
    const dispatch = useDispatch();
      return (
          <LabDrawer.Navigator
          drawerContent={props => {
              return (
                  <View style={{flex: 1, paddingTop: 20}}>
                      <SafeAreaView forceInset={{ top: 'always' , horizontal: 'nver'}}>
                          <DrawerItemList {...props}/>
                          <Button
                           title="Logout"
                           color={Colors.primary}
                           onPress={ () => {

                            console.log('logout click');
                            dispatch(authActions.logout());                               
                           }}
                          />
                      </SafeAreaView>
                  </View>
              )
          }}
          drawerContentOptions={{
              activeTintColor:Colors.primary
          }}>
           <LabDrawer.Screen
            name="Lab"
            component={LabNavigator}
            options={{
                drawerIcon: props => (
                    <Icon
                     name={ Platform.OS === 'android' ? 'ios-medical' : 'ios-add'}
                     size={24}
                     color={props.color}
                    />
                )
            }}
            />   
             
          </LabDrawer.Navigator>
      );
  };


 const ClinicDrawer = createDrawerNavigator();

export const  ClinicNavigator = () => {
    const dispatch = useDispatch();
     return (
           <ClinicDrawer.Navigator 
            drawerContent={props => {
                 return (
                     <View style={{ flex: 1, paddingTop: 20 }}>
                         <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                             <DrawerItemList {...props}/>
                             <Button
                              title="Logout"
                              color={Colors.primary}
                              onPress={()=>{
                                  console.log('logout click');
                                  dispatch(authActions.logout());
                              }}
                             />
                         </SafeAreaView>
                     </View>
                 );
            }}
            drawerContentOptions={{
                activeTintColor:Colors.primary
            }}
            >
            <ClinicDrawer.Screen    
             name="Reception"
             component={ReceptionNavigator}
             options={{
                   drawerIcon : props => (
                       <Icon
                       name={Platform.OS ==='android' ? 'ios-add' : 'ios-add'}
                       size={24}
                       color={props.color}
                        />
                   )
             }}  
             /> 
             <ClinicDrawer.Screen
             name="Doctor"
             component={DoctorNavigator}
              options={{
                  drawerIcon: props => (
                      <Icon
                       name={Platform.OS==='android' ? 'ios-medical' : 'ios-add'}
                       size={24}
                       color={props.color}
                       />
                  )
              }}
              />
          </ClinicDrawer.Navigator>
     );
  };



  const MedicalDrawer = createDrawerNavigator();

  export const MedicalDrawerNavigator = () => {
    const dispatch = useDispatch();
    return (
        <MedicalDrawer.Navigator 
        drawerContent= { props => {
             return(
                  <View style={{flex: 1, paddingTop: 20}}>
                      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                          <DrawerItemList {...props}/>
                           <Button
                            title="Logout"
                            color={Colors.primary}
                             onPress={() => {
                                console.log('logout click');
                                dispatch(authActions.logout());
                             }}
                           />
                      </SafeAreaView>
                  </View>
             );
        }}>
          <MedicalDrawer.Screen
            name="Medical"
            component={MedicalNavigator}
            options={{
                drawerIcon: props => (
                    <Icon
                     name={Platform.OS==='android' ? 'ios-medical' : 'ios-add'}
                     size={24}
                     color={Colors.primary}
                    />
                )
            }}
          />  
        </MedicalDrawer.Navigator>    
    );
  };

  const AuthStackNavigator = createStackNavigator();

 export  const AuthNavigator =  () => {
     return(
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen
             name="Login"
             component={LoginScreen}
             options={LoginScreenOptions}
             />
        </AuthStackNavigator.Navigator>
     );
 }; 