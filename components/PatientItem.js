import React from 'react';
import {View , Text , StyleSheet,TouchableOpacity,TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../constants/Colors';
import CardItem from './CardItem';


const PatientItem = props => {
    
    let TouchableCmp = TouchableOpacity;

   if(Platform.OS === 'android' && Platform.Version >=21){
           TouchableCmp = TouchableNativeFeedback;
   }
    return(
        <CardItem style={styles.screen}>
        <View style={styles.card}>
         <TouchableCmp onPress={props.onSelect} useForeground>
          <View>   
        <View style={styles.textRow}>
            <View style={styles.textTitle}>
           <Text>Patient Name: </Text>
           </View>
           <View style={styles.textTitle}>
           <Text>{props.patientName}</Text> 
           </View>
        </View>
        <View style={styles.textRow}>
            <View style={styles.textTitle}>
           <Text>Mobile No: </Text>
           </View>
           <View style={styles.textTitle}>
           <Text>{props.patientNumber}</Text> 
           </View>
        </View>
        <View style={styles.textRow}>
            <View style={styles.textTitle}>
           <Text>Age: </Text>
           </View>
           <View style={styles.textTitle}>
           <Text>{props.patientAge}</Text> 
           </View>
        </View>
        </View>
        </TouchableCmp>   
    </View>  
    </CardItem>  
    );
};


const styles = StyleSheet.create({
    screen:{
        margin:10
    },
    card:{
        padding:10,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent: 'space-between',
        marginVertical:10
    },
    textRow:{
        flexDirection: 'row'
    },
    textTitle:{
        padding:4,
        fontSize:12,
        justifyContent:'center'
    }

});


export default PatientItem;