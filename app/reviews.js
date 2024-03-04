import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { app, db } from "./Hooks/firebase.config";
import { collection, updateDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import Navbar from './navbar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import useAuthentication from './Hooks/useAuthentication';

const Reviews = () => {
    const { user } = useAuthentication(app);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [showComments, setShowComments] = useState({});
    const [commentTexts, setCommentTexts] = useState({});

    const fetchReviews = async () => {
        try {
            const servicesQuerySnapshot = await getDocs(collection(db, "reviews"));
            const revData = [];
            servicesQuerySnapshot.forEach((doc) => {
                const reviewData = doc.data();
                revData.push({ id: doc.id, ...reviewData });
            });
            setReviews(revData);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleComments = (index) => {
        setShowComments(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleComment = async (reviewId, comments, userEmail) => {
        try {
            const reviewDocRef = doc(db, "reviews", reviewId);
            const reviewDocSnapshot = await getDoc(reviewDocRef);
            
            if (reviewDocSnapshot.exists()) {
                const existingData = reviewDocSnapshot.data();
                const updatedData = {
                    ...existingData,
                    comments: comments
                };
                await updateDoc(reviewDocRef, updatedData);
                fetchReviews(); 
            } else {
                console.log("Review document not found");
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handlePostComment = (review, newComment, index) => {
        const updatedReview = {
            ...review,
            comments: [
                ...(review.comments || []),
                { email: user.email, commentText: newComment }
            ]
        };

        handleComment(review.id, updatedReview.comments, user.email);
        setCommentTexts(prevState => ({
            ...prevState,
            [index]: '', // Clear the input field after posting comment
        }));
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
               <View style={styles.container} >
                <Text style={{ fontFamily: "serif", fontSize: 40, fontWeight: 'bold' }}>See What Our Clients Say!</Text>
                <Text style={{ fontFamily: "serif", fontSize: 20, marginBottom: 8 }}>Want to be more confirmed about our services? Let's see what our customers' say about our services, so that we can assure you more!</Text>
                  {
                    reviews.map((review, index) => (
                        <View key={index}>
                            <View style={styles.contentContainer}>
                                <Text style={styles.title}>"{review.reviewtext}", </Text>
                                <Text>says {review.email}</Text>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 5, marginTop:10 }}>
                                    <TouchableOpacity style={[styles.button, { flex: 0.5 , padding: 8,}]}>
                                        <Text style={styles.buttonText}>{review.likes} <MaterialCommunityIcons name="cards-heart-outline" size={18} color="white" /></Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.button, { flex: 0.5, padding: 8, }]} onPress={() => toggleComments(index)} >
                                        <Text style={styles.buttonText}>{review.comments.length} <Fontisto name="comments" size={18} color="white" /> </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {showComments[index] && (
                                <View>
                                    {review.comments && review.comments.map((comment, commentIndex) => (
                                        <View key={commentIndex} style={{ marginLeft: 20, marginTop: 10 }}>
                                          <Text>{comment.commentText}</Text>
                                          <Text style={{ fontStyle: 'italic', color: 'gray' }}>Commented by: {comment.email}</Text>
                                        </View>
                                    ))}
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 5, alignItems: 'center', marginBottom: 10,marginTop:10 }}>
                                        <View style={{ flex: 0.8 }}>
                                            <TextInput
                                                placeholder="Want to ask or tell something more?"
                                                value={commentTexts[index] || ''}
                                                onChangeText={text => setCommentTexts(prevState => ({ ...prevState, [index]: text }))}
                                                style={styles.input}
                                            />
                                        </View>
                                        <TouchableOpacity style={[styles.button, { flex: 0.2, padding: 15 }]} onPress={() => handlePostComment(review, commentTexts[index] || '', index)}>
                                            <Text style={styles.buttonText}>Post</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
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
  },
});
