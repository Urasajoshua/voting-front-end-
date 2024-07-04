import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import axios from 'axios'; // Import axios
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const SupportScreen = () => {
  const [nominees, setNominees] = useState([]);
  const [user,setUser] = useState('')
  const navigation = useNavigation()

  const retrieveUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      } else {
        Alert.alert('Error', 'User data not found in storage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    retrieveUserId();
  }, []);


  useEffect(() => {
    fetchNominees();
  }, []);

  const fetchNominees = async () => {
    try {
      const response = await axios.get('http://192.168.1.171:8000/nominees/approved_false/'); 
      setNominees(response.data);
    } catch (error) {
      console.error('Error fetching nominees:', error);
    }
  };

  

  const handleSupport = (nomineeId) => {
    const data = {
      user_id : user?.id,
      nominee_id: nomineeId
    }

    console.log('data',data);

    axios.post('http://192.168.1.171:8000/supports/',data).then((response)=>{
      alert('support successfuly')
    }).catch((error)=>{
      console.log('errr',error.response.data);
      alert(`You have already supported this nominee.`)
    })
   
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support Nominees</Text>
        <View style={{ width: 50 }}></View>
      </View>

      {/* Nominees List */}
      <FlatList
        data={nominees}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.nomineeItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nomineeName}>{`${item.user.first_name} ${item.user.last_name}`}</Text>
              <Text style={styles.nomineeDetails}>{item.purpose}</Text>
              <Text style={styles.nomineePosition}>{item.position?.name}</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              {/* <Image
                source={{ uri: item.image }}
                style={styles.nomineeImage}
                resizeMode="cover"
              /> */}
            </View>
            <TouchableOpacity
              style={styles.supportButton}
              onPress={() => handleSupport(item.id)}
            >
              <Text style={styles.supportButtonText}>Support</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{ paddingHorizontal: 15 }}
      />
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00A313',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nomineeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  nomineeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  nomineeDetails: {
    fontSize: 16,
    color: 'gray',
  },
  nomineePosition: {
    fontSize: 16,
    color: 'blue',
  },
  nomineeImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  supportButton: {
    backgroundColor: '#00A313',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  supportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
