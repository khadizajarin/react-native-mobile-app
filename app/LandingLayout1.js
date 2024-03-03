import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, Image, ScrollView,ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import 'tailwindcss/tailwind.css'; 
import useAuthentication from './Hooks/useAuthentication';
import app from './Hooks/firebase.config';
import { signOut } from '@firebase/auth';

const LandingLayout1 = () => {

  const { user,auth } = useAuthentication(app);
  const navigation = useNavigation();

  const handleLogOut = async () => {
    if (user) {
      try {
        await signOut(auth);
         // Remove AsyncStorage data
        await AsyncStorage.clear();
        navigation.navigate('home');
        console.log('User logged out successfully!');
      } catch (error) {
        console.error('Logout error:', error.message);
      }
    }
  };
  

  return (
    <ScrollView >
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {user ? (
          <View  style={{ padding: 10}}>
            <Text style={{fontFamily: "serif", fontSize: 31, fontWeight: 'bold', color: '#689A7C', marginBottom: 10}}>
              Welcome to EvePlano, {user.email ? user.email.split('@')[0] : user.displayName}!
            </Text>
            <Text style={{fontFamily: "serif",fontSize: 18, color: '#689A7C'}}>EvePlano is your one-stop platform for planning and managing social events with ease. Whether you are organizing a birthday party, wedding, corporate gathering, or any other social occasion, EvePlano simplifies the entire process.</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                    <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ padding: 10}}  >
            <Text style={{fontFamily: "serif",fontSize: 31, fontWeight: 'bold', color: '#689A7C', marginBottom: 10}}>Welcome to EvePlano !</Text>
            <Text style={{fontFamily: "serif",fontSize: 18, color: '#689A7C'}}>EvePlano is your one-stop platform for planning and managing social events with ease. Whether you are organizing a birthday party, wedding, corporate gathering, or any other social occasion, EvePlano simplifies the entire process.</Text>
            
          </View>
        )}  
      </View>   
    </ScrollView>
  )
  
};

export default LandingLayout1;

const styles = StyleSheet.create({
  
  logContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#689A7C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});