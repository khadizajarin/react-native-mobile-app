import { Image, ScrollView, StyleSheet, Text, View,  Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Events from '../assets/data';
import Service from './service';
import { app, db } from "./Hooks/firebase.config";
import { collection, query, where, updateDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import AddEvent from './addEvent';

const Services = () => {

  // const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  
  const fetchServices = async () => {
    try {
      const servicesQuerySnapshot = await getDocs(collection(db, "services"));
      const servicesData = [];
      servicesQuerySnapshot.forEach((doc) => {
        servicesData.push(doc.data());
        // console.log(doc.data())
      });
      setEvents(servicesData);
      // console.log("in service page", events);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  
  


  return (
    <ScrollView >
        

        
        {isLoading ? (
          <ActivityIndicator size="large" color="#AB8C56" />
        ) : ( 
          <View style={{backgroundColor: "#ffffff", padding: 20 }}>
            <Text style={{fontFamily: "serif", fontSize: 40, fontWeight: 'bold',color: '#3A3D42', }}>Explore Our Events!</Text>
            <Text style={{fontFamily: "serif", fontSize: 20, marginBottom: 8, color: '#3A3D42' }}>Explore a variety of event management sectors to find your perfect fit. From weddings radiating eternal love to lively birthday bashes and corporate excellence summits, we have it all. Dive into DIY workshops and unleash your creativity. Discover unforgettable experiences with us today.</Text>
                {events.map((event, id) => (
                <View key={id} style={{ marginBottom: 10 }}>
                    <Service service={event}></Service>
                </View>
            ))}
        </View>
        )}

    </ScrollView>
  )
}

export default Services

const styles = StyleSheet.create({})