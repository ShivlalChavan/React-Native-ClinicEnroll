import React from 'react';
import { View , Text , StyleSheet} from 'react-native';




const MedicineDetail = props => {

  return(
      <View style={styles.screen}>
           <Text>Medicine Detail</Text>
      </View>
  );

};

export const screenOptions = navData => {
     return {
         headerTitle:'Medicine Detail'
     };
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    }

});

export default MedicineDetail;
