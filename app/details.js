import { Image, ScrollView, StyleSheet, Text, View,  Button, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import Events from './../assets/data';
import { useRoute } from '@react-navigation/native';
import Navbar from './navbar';
import useAuthentication from './Hooks/useAuthentication';
import { app, db, collection, addDoc } from "./Hooks/firebase.config"
import { useNavigation } from 'expo-router';
import Video from './video';




const Details = () => {
  
  const { user } = useAuthentication(app);

  const route = useRoute(); 
  const navigation = useNavigation();
  const { serviceId } = route.params || {};

  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [venue, setVenue] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  

  const handleBooking = async (event) => {
    try {
      const eventData = {
        user: user.email,
        eventName: event.name,
      };
      const bookingData = {
        numberOfGuests: numberOfGuests,
        venue: venue,
        time: time,
        date: date,
        phoneNumber: phoneNumber,
        specialRequirements: specialRequirements,
      };
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        eventData: eventData,
      });
      console.log('Document written with ID: ', docRef.id);
      // Clear the form fields after successful booking
      setNumberOfGuests("");
      setVenue("");
      setTime("");
      setDate("");
      setPhoneNumber("");
      setSpecialRequirements("");
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  
 

  return (
    <ScrollView style={styles. wholeContain}>
      {user ? (
        <View>
           <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}>
              <Navbar></Navbar>
          </View>
             {Events.filter((event) => (event.id === serviceId)).map((event, id) => (
                <View key={id} style={{ margin: 10 }}>
                  <Image source={{ uri: event.image }} style={{  borderRadius: 10, height: 200, margin: 10 }} />
                  <Text style={{fontFamily: "serif", fontSize: 20, fontWeight: 'bold', marginTop: 4, color: '#689A7C', }}>{event.name}</Text>
                  <Text style={{fontFamily: "serif", fontSize: 18, fontWeight: 'bold', marginTop: 4, color: '#689A7C', }}>Approximate Cost: {event.price} (For 50 Guests)</Text>
                  <Text style={{fontFamily: "serif", fontSize: 16, marginBottom: 15, color: '#689A7C', }}>{event.description}</Text>  

                  <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', borderTopWidth: 1, borderTopColor:'gray'}}>
                    <Video></Video>
                  </View>

                  

                   {/* Form for booking */}
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: "serif", fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#689A7C', }}>Do you want to book? Please submit the infos and our representative will contact you. </Text>
                    <TextInput
                      placeholder="Number of Guests"
                      style={[styles.input, { color: '#689A7C' }]}
                      placeholderTextColor="#689A7C"
                      value={numberOfGuests}
                      onChangeText={text => setNumberOfGuests(text)}
                    />
                    <TextInput
                      placeholder="Venue"
                      style={[styles.input, { color: '#689A7C' }]}
                      placeholderTextColor="#689A7C"
                      value={venue}
                      onChangeText={text=>setVenue(text)}
                    />
                    <TextInput
                      placeholder="Time"
                      style={[styles.input, { color: '#689A7C' }]}
                      placeholderTextColor="#689A7C"
                      value={time}
                      onChangeText={text=>setTime(text)}
                    />
                    <TextInput
                      placeholder="Date"
                      style={[styles.input, { color: '#689A7C' }]}
                      placeholderTextColor="#689A7C"
                      value={date}
                      onChangeText={text=>setDate(text)}
                    />
                    <TextInput
                      placeholder="Phone Number"
                      style={[styles.input, { color: '#689A7C' }]}
                      placeholderTextColor="#689A7C"
                      value={phoneNumber}
                      onChangeText={text=>setPhoneNumber(text)}
                    />
                    <TextInput
                      placeholder="Any Special Requirements"
                      style={[styles.input, { height: 100 },{ color: '#689A7C' }]}
                      placeholderTextColor="#689A7C"
                      multiline={true}
                      value={specialRequirements}
                      onChangeText={text=>setSpecialRequirements(text)}
                    />
                    <TouchableOpacity onPress={() => handleBooking(event)} style={styles.button}>
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>


                </View>
              ))}  
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <Text>Please login to access details.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.button} >
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      )}    
    </ScrollView>
  )
}

export default Details



const styles = StyleSheet.create({
  wholeContain: {
    fontFamily: "serif"
  },

  input: {
    color: '#689A7C',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  loginContainer: {
    height: 500,
    flex: 1,
    display: 'flex',
    flexDirection:' column',
    justifyContent:'center',
    alignItems: 'center',
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
})