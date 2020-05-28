import React from 'react';
import {StyleSheet,View} from 'react-native';
import DateTimePicker  from '@react-native-community/datetimepicker';



const DatePicker = props => {

    return(
        <View>
          <DateTimePicker
           {...props}
            />
        </View>         
    );


};


const styles = StyleSheet.create({

});

export default DatePicker;

