import { useNavigation , useRoute} from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'; 


const Service = ({ service }) => {
  const { id, name, image, description } = service;
  const navigation = useNavigation();

  // const handleDetails = () => {
  //   navigation.navigate('details', { serviceId: id });
  // };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text>{description}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('details', { serviceId: id })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Service;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    height: 200,
    borderRadius: 10,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    // color: 'white',
    backgroundColor: '#689A7C',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});



