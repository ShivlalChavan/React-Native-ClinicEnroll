import React ,{useState} from 'react';
import {View , Text , StyleSheet ,ScrollView,TextInput,Button,ActivityIndicator} from 'react-native';
import ImagePicker from '../../components/ImagePicker'; 
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import {v4 as uuidv4} from 'uuid';

import firebase from '../../databaseconfig/firebaseConfig';
import { firestore, storage } from 'firebase';

import moment from 'moment';
import Document from '../../models/Document';


const UploadPatientDocument = props => {
   
  const patientId = props.route.params.patientId;
  const id = props.route.params.id;

    const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageData,setImageData] =useState();

   const selectedPatient = useSelector(state => 
        state.patient.patientData.find(patient => patient.id === id)
        );

    console.log("Patient name" +selectedPatient.pateintId);
       
 // const dispatch = useDispatch();

  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
  };

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
    //console.log('fileExtension' +imagePath.split('.').pop());
  };

  
 
  const imageResponse = responseData => {
        console.log("ImagePath"+responseData.uri);
        setImageData(responseData);
  };

const  uriToBlob = async (imagePath) => {
    return (blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
   };
   xhr.onerror = function() {
     //unsubscribe();
     reject(new TypeError('Network request failed')); // error occurred, rejecting
   };
   xhr.responseType = 'blob'; // use BlobModule's UriHandler
   xhr.open('GET', imagePath, true); // fetch the blob from uri in async mode
   xhr.send(null); // no initial data
 })
  )};

  const saveImageDocument = async () => {

    setIsLoading(true);

    var uuid = uuidv4();

    //const response = await fetch(imageData);
    //const blob = response.blob();

    //const imageBlob = blob[0]
        const blob = await uriToBlob(selectedImage);
    //console.log('blob'+blob);

  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function() {
  //       resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
  //    };
  //    xhr.onerror = function() {
  //      //unsubscribe();
  //      reject(new TypeError('Network request failed')); // error occurred, rejecting
  //    };
  //    xhr.responseType = 'blob'; // use BlobModule's UriHandler
  //    xhr.open('GET', selectedImage, true); // fetch the blob from uri in async mode
  //    xhr.send(null); // no initial data
  //  });

    var storageRef = firebase.storage().ref(`Clinic/LabDocument/${uuid}`).put(blob,{
      contentType:'image/jpeg'
    });
    
    storageRef.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot)  {
            console.log("snapshot: " + snapshot.state);
            console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
             
            if(snapshot.state === firebase.storage.TaskState.SUCCESS){
              
              console.log("Success");
            }
          },
          error => {
            //unsubscribe();
            setIsLoading(false);
          console.log("image upload error: " + error.message);
          },
          function()  {
            storageRef.snapshot.ref.getDownloadURL()
             .then((downloadURL) => {
              console.log("File available at: " + downloadURL);
              saveImageUrlInList(downloadURL);
             // setIsLoading(false);
              console.log("File available at: " + downloadURL);
             })
          }
        )

  };

  const saveImageUrlInList = imageUrl => {
     
    var date = new Date();
    const converteddate = moment(date).format('DD/M/yyyy');

    const documnetId = firebase.database().ref().push().key;

    const documentObject = new Document(selectedPatient.pateintId,documnetId,'test report',imageUrl,converteddate);
    
    selectedPatient.isDocumentAdded = true;

    firebase.database().ref(`PatientData/patientData/patientList/${selectedPatient.id}`)
    .set(selectedPatient).then(() =>{
       //setIsLoading(false);
             // props.navigation.goBack();            
   }).catch((error) => {
       console.log("ineroro "+error.message);
   });

    firebase.database().ref('PatientData/patientDocument/documentList')
      .push(documentObject).then(()=>{
             
           setIsLoading(false);
             props.navigation.goBack();

      }).catch((error) => {

        console.log("in error document"+error.message);
      })
   
      
  };

  if(isLoading){
    return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary}/>
        </View>
    );
}

    return(
        <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={titleChangeHandler}
            value={titleValue}
          />
           <ImagePicker onImageTaken={imageTakenHandler} 
           onImageResponse={imageResponse}/>
           
          <Button
            title="Save Document"
            color={Colors.primary}
            onPress={() => {
                saveImageDocument();
              }}
          />
        </View>
      </ScrollView>
    );
};

export const screenOptions = navData => {
      return {
            headerTitle:'Upload Report'
      };      
};

const styles = StyleSheet.create({

    form: {
        margin: 30
      },
      label: {
        fontSize: 18,
        marginBottom: 15
      },
      textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
      },
      centered: {   
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center' 
      }

});

export default UploadPatientDocument;