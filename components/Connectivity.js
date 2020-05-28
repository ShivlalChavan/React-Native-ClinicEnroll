import React from 'react';
import { NetInfo , Platform } from 'react-native';


const NetworkInfo = props => {

    if(Platform.OS === 'android'){

        NetInfo.isConnected.fetch().then( isConnected => {
             if(isConnected){
                 props.isConnected = true;
             }
             else
             {
               props.isConnected = false;
             }
        });
    }
    else {
            
        NetInfo.isConnected.addEventListener(
            "connectionChange",
            this.handleFirstConnectivity
        );

    }

    handleFirstConnectivity = isConnected =>{
       
        NetInfo.isConnected.removeEventListener(
            "connectionChange",
            this.handleFirstConnectivityChange
          );

          if (isConnected === false) {
            props.isConnected = false;
          } else {
            props.isConnected = true;
          }
    }


    

};



export default NetworkInfo;