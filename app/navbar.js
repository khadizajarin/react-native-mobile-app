import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useAuthentication from './Hooks/useAuthentication';
import app from './Hooks/firebase.config';

const Navbar = () => {
  const {user, auth} = useAuthentication(app);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Link href="/" style={styles.link}>
          Home
        </Link>
        <Link href="/services" style={styles.link}>
          Services
        </Link>
        <Link href="/contact" style={styles.link}>
          Contact
        </Link>
      </View>

      {user && (
        <View style={styles.row}>
        <Link href="/reviews" style={styles.link}>
          Reviews
        </Link>
        <Link href="/location" style={styles.link}>
          Location
        </Link>
        <Link href="/profile" style={styles.link}>
          Profile
        </Link>
      </View>
      )}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#C3E2C2',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  link: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    padding: 10,
  },
});
