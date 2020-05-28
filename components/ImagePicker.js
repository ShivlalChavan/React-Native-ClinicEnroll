import React , {useState} from 'react';
import {View , Text,Button, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';
import ImagePicker from 'react-native-image-picker';

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState(); 

    const takeImageHndler = () => {

        const options = {
            title: 'Select Avatar',
            customButtons : [{name:'fb', title:'Choose Photo from facebok'}],
            storageOptions : {
                skipBackup:true,
                path:'images',  
            },   
        };

        ImagePicker.showImagePicker(options , (response) => {
          // console.log('Response = ',response);
       
           if(response.didCancel) {
            console.log('User Cancelled Image Picker');
           } else if(response.error) {
            console.log('ImagePicker Error: ', response.error);
           }else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
        
            // You can also display the image using data:
             const imgsource = { uri: 'data:image/jpeg;base64,' + response.data };
        
            // this.setState({
            //   avatarSource: source,
            // });
           // console.log('ImagePicker Response: ', response.data);
        
            setPickedImage(response.uri);
            props.onImageTaken(response.uri);
            props.onImageResponse(imgsource);
          }

        });  
    };


    return (
          <View style={styles.imagePicker}>
              <View style={styles.imagePreview}>
               {!pickedImage ? (
                   <Text>No Image Picked Yet.</Text>
               ):(
                   <Image style={styles.image} source={{uri:pickedImage}}/>
               )}
              </View>
                <Button
                  title="Take Photo"
                  color={Colors.primary}
                  onPress={takeImageHndler}
                /> 
          </View>
    );
};


const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom:10
      },
      imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
      },
      image: {
        width: '100%',
        height: '100%'
      }
});

export default ImgPicker;
