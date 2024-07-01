import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-async-storage/async-storage";

const UploadFileScreen = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [materialType, setMaterialType] = useState('image'); // Replace with actual material type
  const [description, setDescription] = useState(''); // State for description
  const [isNominee, setIsNominee] = useState(false);
  const [nomineeId, setNomineeId] = useState(null);

  const retrieveUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
        checkIfUserIsNominee(parsedUserData.id);
      } else {
        Alert.alert('Error', 'User data not found in storage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const checkIfUserIsNominee = async (userId) => {
    try {
      const response = await axios.get(`http://192.168.1.171:8000/info/${userId}/`);
      if (response.data.is_nominee) {
        setIsNominee(true);
        setNomineeId(response.data.nominee_info.id);
      }
    } catch (error) {
      console.error('Error checking nominee status:', error);
    }
  };

  useEffect(() => {
    retrieveUserId();
  }, []);
  console.log('user',user?.id);

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setFile(result);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };
  

  const uploadFile = async () => {
    if (!file) {
      Alert.alert('No file selected', 'Please select a file to upload.');
      return;
    }
  
    if (!isNominee) {
      Alert.alert('Permission Denied', 'Only nominees can upload campaign materials.');
      return;
    }
  
    if (!description) {
      Alert.alert('Missing Description', 'Please provide a description for the file.');
      return;
    }
  
    let formData = new FormData();
    formData.append('user_id', user.id); // Replace with user ID logic
    formData.append('material_type', materialType);
    formData.append('description', description); // Append description to formData

    if (file.type === 'image' || file.type === 'video') {
      formData.append('file', {
        uri: file.uri,
        name: file.name || `filename.${file.uri.split('.').pop()}`,
        type: file.mimeType || 'application/octet-stream',
      });
    } else {
      Alert.alert('Unsupported File Type', 'Please select an image or video file.');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.1.171:8000/campaign_materials/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'File uploaded successfully.');
  
      // Clear form data after successful upload
      setFile(null);
      setDescription('');
    } catch (error) {
      console.error('Upload error:', error.response.data);
      Alert.alert('Error', 'Failed to upload file.');
    }
  };
  
  

  const handleFilePreviewClick = () => {
    setFile(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Upload File</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
    
      {file && (
        <TouchableOpacity style={styles.previewContainer} onPress={handleFilePreviewClick}>
          {file.type === 'image' ? (
            <Image source={{ uri: file.uri }} style={styles.imagePreview} />
          ) : file.type === 'video' ? (
            <Video
              source={{ uri: file.uri }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay
              isLooping
              style={styles.videoPreview}
            />
          ) : file.mimeType === 'application/pdf' ? (
            <WebView
              source={{ uri: file.uri }}
              style={styles.pdfPreview}
              useWebKit
              startInLoadingState
            />
          ) : (
            <Text style={styles.filePreview}>{file.name}</Text>
          )}
          <Text style={styles.changeButtonText}>Change File</Text>
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.descriptionInput}
        placeholder="Enter description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Upload File" onPress={uploadFile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00A313',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  previewContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  videoPreview: {
    width: 200,
    height: 200,
  },
  pdfPreview: {
    width: 200,
    height: 200,
  },
  filePreview: {
    fontSize: 16,
    color: 'gray',
  },
  changeButtonText: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  descriptionInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
});

export default UploadFileScreen;
