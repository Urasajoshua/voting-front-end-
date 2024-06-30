// import React, { useState } from 'react';
// import { View, Button, Text, Alert } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import axios from 'axios';


// const CampainMaterial = () => {
//     const [selectedFile, setSelectedFile] = useState(null);

//     const selectFile = async () => {
//       try {
//         const res = await DocumentPicker.pick({
//           type: [DocumentPicker.types.allFiles],
//         });
//         setSelectedFile(res);
//       } catch (err) {
//         if (DocumentPicker.isCancel(err)) {
//           // User cancelled the picker
//           Alert.alert('Cancelled');
//         } else {
//           Alert.alert('Error', 'Failed to pick file');
//         }
//       }
//     };
  
//     const uploadFile = async () => {
//       try {
//         const formData = new FormData();
//         formData.append('file', {
//           uri: selectedFile.uri,
//           name: selectedFile.name,
//           type: selectedFile.type,
//         });
  
//         const response = await axios.post('YOUR_API_ENDPOINT_HERE', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
  
//         Alert.alert('Upload Successful', response.data.detail);
//         setSelectedFile(null); // Clear selected file after upload
//       } catch (error) {
//         Alert.alert('Upload Failed', 'Failed to upload file');
//         console.error('Error uploading file:', error);
//       }
//     };
  
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Button title="Select File" onPress={selectFile} />
//         {selectedFile && (
//           <View style={{ marginTop: 20 }}>
//             <Text>Selected File: {selectedFile.name}</Text>
//             <Button title="Upload File" onPress={uploadFile} />
//           </View>
//         )}
//       </View>
//     );
//   };
  
// export default CampainMaterial

// const styles = StyleSheet.create({})