import React from 'react';
import { View , Text , StyleSheet ,Platform,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CardItem from './CardItem';
import Colors from '../constants/Colors';


const MedicineItem = props => {

    return (
        <CardItem style={styles.screen}>
         <View style={styles.layout}>
         <View style={styles.contentContainer}>          
           <View style={styles.textRow}>
            <View style={styles.textTitle}>
           <Text>Medicine Name: </Text>
           </View>
           <View style={styles.textTitle}>
           <Text>{props.medicineName}</Text> 
           </View>
         </View>
         <View style={styles.textRow}>
            <View style={styles.textTitle}>
           <Text>Medicine Qty: </Text>
           </View>
           <View style={styles.textTitle}>
           <Text>{props.medicineQty}</Text> 
           </View>
         </View>
            </View>
            <View style={styles.imageConatiner}>
             <View style={styles.image}>
             <TouchableOpacity
              style={styles.iconContainer}
              onPress={props.onEdit}>
                    <Icon
                     name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                     size={24}       
                    />
                </TouchableOpacity>
                </View>
                <View style={styles.image}>
             <TouchableOpacity
             style={styles.iconContainer}
             onPress={props.Delete}>
                    <Icon
                     name={Platform.OS === 'android' ? 'ios-trash' : 'ios-trash'}
                     size={24}       
                    />
                </TouchableOpacity>
                </View>
            </View>
         </View>   
        </CardItem>
    );

};


const styles = StyleSheet.create({
    screen:{
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        marginBottom:10       
    },
    layout:{
        margin:10,
        flex:1,
        flexDirection:'row'

    },
    contentContainer:{
        flex:3,
        flexDirection:'column'

    },
    imageConatiner:{
        flex:1,
    },
    textRow:{
        flexDirection: 'row'
    }, 
    image:{
        margin:10
    },
    iconContainer: {
        width:'100%',
        height:'100%',
        flex:1
    }

});

export default MedicineItem;
