import React ,{ useEffect,useState,useReducer, useCallback} from 'react';
import { View , Button ,StyleSheet , ScrollView, ActivityIndicator ,KeyboardAvoidingView ,Platform ,SafeAreaView } from 'react-native'
import { useDispatch} from 'react-redux';

import InputText from '../../components/InputText';
import Colors from '../../constants/Colors';

import SnackBar from 'react-native-snackbar';
import CardItem from '../../components/CardItem';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state,action) => {
 
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
          ...state.inputValues,
          [action.input]: action.value
        };
        
        const updatedValidities = {
           ...state.inputValidities,
           [action.input]: action.isValid
        };
       let updatedFormIsValid = true;
       for(const key in updatedValidities){
           updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
       };  

       return{
           formIsValid: updatedFormIsValid,
           inputValidities: updatedValidities,
           inputValues: updatedValues
       };

    }
  return state;
};

const LoginScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const[formState, dispatchFormState]  = useReducer(formReducer,{
    inputValues:{
        email: '',
        password: ''
    },
    inputValidities: {
        email:false,
        password:false
    },
    formIsValid:false  
  });

  useEffect(()=>{
      if(error){
        SnackBar.show({
            text:error,
            duration:SnackBar.LENGTH_SHORT
         });
      }
  },[error]);

  const authHandler = async () => {
    setError(null);
    setIsLoading(true);
    let action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
     );
    try{
        console.log("email:- "+ formState.inputValues.email);
        console.log("password:- "+ formState.inputValues.password);
     await dispatch(action);
     setIsLoading(false); 
    }
    catch (err) {
        setError(err.message);
        setIsLoading(false);  
     }

  };

  const inputChangeHandler = useCallback(
      (inputIdentifier,inputValue,inputValidity) =>{
          dispatchFormState({
              type:FORM_INPUT_UPDATE,
              value:inputValue,
              isValid:inputValidity,
              input:inputIdentifier
          });
    },
    [dispatchFormState]
    );

    if(isLoading){
        return(
            <View style={styles.progressbar}>
                <ActivityIndicator size="large" color={Colors.primary}>
                </ActivityIndicator>
            </View>
        );
    }
 
    return(
      <SafeAreaView style={{flex:1}}>
       <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? "padding" : null} 
      style={styles.screen}
      enabled

    > 
        <View style={styles.form}>
         <CardItem style={styles.authContainer}>
          <ScrollView>
            <InputText
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <InputText
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
                <Button
                  title="Login"
                  color={Colors.primary}
                  onPress={authHandler}
                />
            </View>
          </ScrollView>
        </CardItem>
        </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );

};

export const screenOptions = {
    headerTitle: 'Login'
  };


const styles = StyleSheet.create({
    screen: {
        flex: 1
      },
      form:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
      },
      gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
      },
      buttonContainer: {
        marginTop: 10
      },
      progressbar:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
      }

});

export default LoginScreen;