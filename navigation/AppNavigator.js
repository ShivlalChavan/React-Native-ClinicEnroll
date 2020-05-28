import React ,{useState, useEffect} from 'react';
import {View,ActivityIndicator} from 'react-native';
import { useSelector} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator ,ClinicNavigator ,MedicalDrawerNavigator,LabDrawerNavigator} from './ClinicNavigator';
import StartScreen  from '../screens/splashscreen/StartScreen';
import Color from '../constants/Colors';



const AppNavigator = props => {
 
   const isAuth = useSelector(state => !!state.auth.userId);
   const loginUser = useSelector(state => state.auth.emailId);
   const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
   const navigatorr = useSelector(state => state.auth.navigator);
   const [isLoading , setIsLoading] = useState(true);
   const [navigator , setNavigator] = useState('');

   console.log("in appnavi:- "+isAuth);
   console.log("didtrytoLofogn"+didTryAutoLogin);
   console.log("loginuser"+loginUser);
   console.log("navigator - "+navigatorr);

//    useEffect(()=>{
//     setNavigator(navigatorr);
//    },[]);
   

    // if(navigatorr === undefined || navigatorr === null)
    // {
    //     navigatorr = 'ClinicNavigator';
    // }
   
    if(navigatorr === 'ClinicNavigator')
    {
        return(
            <NavigationContainer>
                {isAuth && <ClinicNavigator/>}
                {!isAuth &&  didTryAutoLogin && <AuthNavigator/>}
                {!isAuth && !didTryAutoLogin && <StartScreen/>}
            </NavigationContainer>
        );
    }
    else if (navigatorr === 'MedicalDrawerNavigator')
    {
        return(
            <NavigationContainer>
                {isAuth && <MedicalDrawerNavigator/>}
                {!isAuth &&  didTryAutoLogin && <AuthNavigator/>}
                {!isAuth && !didTryAutoLogin && <StartScreen/>}
            </NavigationContainer>
        );
    } 
    else if (navigatorr === 'LabDrawerNavigator') {
        return(
            <NavigationContainer>
                {isAuth && <LabDrawerNavigator/>}
                {!isAuth &&  didTryAutoLogin && <AuthNavigator/>}
                {!isAuth && !didTryAutoLogin && <StartScreen/>}
            </NavigationContainer>
        );
    }
    else {
        return(
            <NavigationContainer>
                {isAuth && <ClinicNavigator/>}
                {!isAuth &&  didTryAutoLogin && <AuthNavigator/>}
                {!isAuth && !didTryAutoLogin && <StartScreen/>}
            </NavigationContainer>
        );
    }
    
   

    //   if(isLoading)
    //   {
    //       return(
    //           <View style={{flex:1}}>
    //               <ActivityIndicator size="large" color={Color.primary}/>
    //           </View>
    //       )
    //   }
    
};

export default AppNavigator;

 