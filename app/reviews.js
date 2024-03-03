import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app, db } from "./Hooks/firebase.config";
import { collection, query, where, updateDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import Navbar from './navbar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import useAuthentication from './Hooks/useAuthentication';

const Reviews = () => {

  const { user } = useAuthentication(app);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  
  const fetchReviews = async () => {
    try {
      const servicesQuerySnapshot = await getDocs(collection(db, "reviews"));
      const revData = [];
      servicesQuerySnapshot.forEach((doc) => {
        revData.push(doc.data());
      });
      setReviews(revData);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComment = async (reviewId, commentText, userEmail) => {
    try {
        const comments = {
            text:commentText,
            email: user.email
        }
        console.log(comments);
        const reviewDocRef = doc(db, "reviews", reviewId);
        await updateDoc(reviewDocRef, comments);

        fetchReviews();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handlePostComment = () => {
        // handleComment(review.id, newComment, user.email);
        setNewComment('');
    };


    useEffect(() => {
        fetchReviews();
    }, []);

  return (
    <ScrollView>
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}>
            <Navbar></Navbar>
        </View>

        <View>
        {isLoading ? (
        <ActivityIndicator size="large" color="#689A7C"  />
        ) : (
        reviews.map((review, index) => (
            <View style={styles.container} key={index}>
            <Text style={{ fontFamily: "serif", fontSize: 40, fontWeight: 'bold' }}>See What Our Clients Say!</Text>
            <Text style={{ fontFamily: "serif", fontSize: 20, marginBottom: 8 }}>Want to be more confirmed about our services? Let's see what our customers' say about our services!So that we can assure you more!</Text>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>"{review.reviewtext}", </Text>
                <Text>says {review.email}</Text>

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" , gap: 5}}>
                    <TouchableOpacity style={[styles.button, { flex: 0.5 }]}>
                        <Text style={styles.buttonText}>{review.likes} <MaterialCommunityIcons name="cards-heart-outline" size={18} color="white" /></Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { flex: 0.5 }]} onPress={toggleComments} >
                        <Text style={styles.buttonText}>{review.comments} <Fontisto name="comments" size={18} color="white" /> </Text>
                    </TouchableOpacity>
                </View>
            </View>
             {/* Display comments if showComments is true */}
             {showComments && (
                <View>
                    {/* Map through existing comments and display them */}
                    {/* {review.comments.map((comment, index) => (
                        <View key={index}>
                            <Text>{comment.text}</Text>
                            <Text>{comment.email}</Text>
                        </View>
                    ))} */}

                    {/* Input field for new comment */}
                    <TextInput
                        placeholder="Enter your comment..."
                        value={newComment}
                        onChangeText={text => setNewComment(text)}
                    />

                    {/* Button to post new comment */}
                    <TouchableOpacity style={styles.button} onPress={handlePostComment}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
        
        ))
        )}
        </View>

    </ScrollView>
    
  );
}

export default Reviews;

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
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
