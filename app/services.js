import { Image, ScrollView, StyleSheet, Text, View,  Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import Events from './../assets/data';
import Navbar from './navbar'
import { useNavigation } from 'expo-router';
import Service from './service';

const Services = () => {

  const navigation = useNavigation();



  return (
    <ScrollView >
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}>
            <Navbar></Navbar>
        </View>
        <View style={{backgroundColor: '#C3E2C2', padding: 20   }}>
            <Text style={{fontFamily: "serif", fontSize: 40, fontWeight: 'bold' }}>Explore Our Events!</Text>
                <Text style={{fontFamily: "serif", fontSize: 20, marginBottom: 8 }}>Explore a variety of event management sectors to find your perfect fit. From weddings radiating eternal love to lively birthday bashes and corporate excellence summits, we have it all. Dive into DIY workshops and unleash your creativity. Discover unforgettable experiences with us today.</Text>
                {Events.map((event, id) => (
                <View key={id} style={{ marginBottom: 10 }}>
                    <Service service={event}></Service>
                </View>
            ))}
       </View>
    </ScrollView>
  )
}

export default Services

const styles = StyleSheet.create({})