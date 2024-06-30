import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import axios from 'axios';
import { WebView } from 'react-native-webview';

const UploadFileScreen = () => {
  const [file, setFile] = useState(null);
  const [nominee, setNominee] = useState('1'); // Replace with actual nominee ID
  const [materialType, setMaterialType] = useState('image'); // Replace with actual material type
  const [description, setDescription] = useState('Sample description'); // Replace with actual description

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

    let formData = new FormData();
    formData.append('nominee', nominee);
    formData.append('material_type', materialType);
    formData.append('description', description);
    formData.append('file', {
      uri: file.uri,
      name: file.name || `filename.${file.uri.split('.').pop()}`,
      type: file.mimeType || 'application/octet-stream',
    });

    console.log('jhjhjh',formData);

    try {
      const response = await axios.post('http://192.168.1.171:8000/campaign_materials/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'File uploaded successfully.');
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
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Pick a Document</Text>
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
});

export default UploadFileScreen;
