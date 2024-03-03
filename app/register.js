import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { initializeApp } from '@firebase/app';
import {app, db, collection, addDoc} from './Hooks/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signOut } from '@firebase/auth';
import useAuthentication from './Hooks/useAuthentication';
import { Link, useNavigation } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {

  const { user, auth } = useAuthentication(app);
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered successfully!');
        const user = auth.currentUser;
        const userData = {
            email: user.email,
            displayName: '',
            phoneNumber: '',
            photoURL: ''
        };
        const usersCollectionRef = await setDoc(doc(db, 'users', user.uid), userData);
        navigation.navigate('home');
    } catch (error) {
        console.error('Registration error:', error.message);
    }
};


  const goToLogin = () => {
    // Navigate to login screen
  };

  return (
    <View style={styles.container}>
        <Text style={styles.heroTitle}>Join Us Today!</Text>
        {/* <Text> {user.email}</Text> */}
        <View style={styles.formContainer}>
          {/* name */}
            {/* <View style={styles.formControl}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
            />
            </View> */}
            {/* Email */}
            <View style={styles.formControl}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
            />
            </View>
            {/* Password */}
            <View style={styles.formControl}>
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            </View>
            {/* Phone NUmber */}
            {/* <View style={styles.formControl}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                onChangeText={(text) => setPhoneNumber(text)}
            />
            </View> */}
            <TouchableOpacity style={styles.button} onPress={handleRegistration}>
            <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.hero}>
            <View style={styles.heroContent}>
            <Text style={styles.heroDescription}>Already have an account?</Text>
            <Text style={styles.heroDescription}>Create an account to access exclusive features.</Text>
            <Link href="/" style={styles.button}>
                <Text style={styles.buttonText}>Back to Login</Text>
            </Link>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "serif",
    backgroundColor: '#E6F6E6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  formControl: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
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
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heroDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Register;
