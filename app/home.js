import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import LandingLayout1 from './LandingLayout1'
import Upcomings from './upcomings'
import Login from './login'
import Navbar from './navbar'
import useAuthentication from './Hooks/useAuthentication'
import app from './Hooks/firebase.config'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


const Home = () => {
  const { user, auth } = useAuthentication(app);
  return (
    <View> 
                <ScrollView>
                  <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                      <Navbar></Navbar>
                  </View>
                    <LandingLayout1></LandingLayout1>
                    <Upcomings></Upcomings>
                    { !user && (<Login></Login>  )}
                    
                    
                </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})