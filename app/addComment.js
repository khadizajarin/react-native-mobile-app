import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { app, db,  addDoc } from "./Hooks/firebase.config"
import { collection, query, where, updateDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import useAuthentication from './Hooks/useAuthentication';



const AddComment = () => {

    const { user } = useAuthentication(app);
    const [reviewText, setReviewText] = useState(''); // Changed variable name to avoid conflict

    const handleAddReviews = async() => {
        try {
            const newReview = { // Renamed variable to newReview
              comments: [],
              email: user.email,
              isLikedByMe: '',
              reviewtext: reviewText, // Changed to reviewText
              likes: ''
            };

            const docRef = await addDoc(collection(db, 'reviews'), newReview);
            console.log('Document written with ID: ', docRef.id);
            setReviewText(''); // Clear the input after submission
          } catch (e) {
            console.error('Error adding document: ', e);
          }
    };

    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: "serif", fontSize: 15, marginBottom: 8 }}>Feel free to give any suggestions or complaints! We will heartily try to solve it!</Text>
            <TextInput
                style={styles.input}
                placeholder="Write your suggestions or complaints"
                value={reviewText}
                onChangeText={text => setReviewText(text)}
            />
            
            <TouchableOpacity onPress={handleAddReviews} style={[styles.button, {padding: 15 }]}>
                <Text style={styles.buttonText}>Post your review!</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddComment;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#C3E2C2",
      padding: 20,
      marginBottom: 10,
    },
    contentContainer: {
      marginTop:10,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    button: {
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: '#689A7C',
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    input: {
      color: '#689A7C',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom:10
    },
  });
