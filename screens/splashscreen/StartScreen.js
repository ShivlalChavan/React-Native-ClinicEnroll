import React , {useEffect} from 'react';
import {View,Text, ActivityIndicator,StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import * as authActions from '../../store/actions/auth';
import MedicalDrawerNavigator from '../../navigation/ClinicNavigator';


const StartScreen = props => {

    const dispatch = useDispatch();

    console.log("in start screen ");

    useEffect(() => {
    const tryLogin = async () => {
        
        console.log("useEffect");
        const userData =  await AsyncStorage.getItem('userData');

        if(!userData){
           // props.navigation.navigate('Login');
           console.log("not user");
           dispatch(authActions.setDidTryAL());
           return;
        }
         const transformedData = JSON.parse(userData);
         const { userId , emailId } = transformedData;

       // const userId = userData;
        console.log("in Startup :- "+userId);

      //  const navigator = 'MedicalDrawerNavigator';

       // dispatch(authActions.setNavigator(navigator));
          console.log("SetNavi");
      //  props.navigation.navigate('Shop');
        dispatch(authActions.authenticate(userId, emailId));

         

        // if(emailId ==='doctor@gmail.com')
        // {
        //   const navigator = 'MedicalDrawerNavigator';
        //   dispatch(authActions.setNavigator(navigator));
        // }
        
    };
        tryLogin();
},[dispatch]);

    return(
   <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
    );

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
});


export default StartScreen;

