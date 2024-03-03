import { Image, ScrollView, StyleSheet, Text, View,  Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Events from './../assets/data';
import Navbar from './navbar'
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
      });
      setEvents(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  // console.log(events); 
  


  return (
    <ScrollView >
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}>
            <Navbar></Navbar>
        </View>

        
        {isLoading ? (
          <ActivityIndicator size="large" color="#689A7C"  />
        ) : ( 
          <View style={{backgroundColor: '#C3E2C2', padding: 20   }}>
            
            <Text style={{fontFamily: "serif", fontSize: 40, fontWeight: 'bold' }}>Explore Our Events!</Text>
            <Text style={{fontFamily: "serif", fontSize: 20, marginBottom: 8 }}>Explore a variety of event management sectors to find your perfect fit. From weddings radiating eternal love to lively birthday bashes and corporate excellence summits, we have it all. Dive into DIY workshops and unleash your creativity. Discover unforgettable experiences with us today.</Text>
                {/* add event is only for admin */}
            <AddEvent></AddEvent> 
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