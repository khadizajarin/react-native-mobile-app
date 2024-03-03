import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Upcomings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Social Events...</Text>
      <View style={styles.eventContainer}>
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Autumn Music festival</Text>
          <Text>Date: March 15, 2024</Text>
          <Text>Time: 2:00 PM - 5:00 PM</Text>
          <Text style={styles.eventDescription}>Join us for a day of music, fun, and good vibes!</Text>
          <Text style={styles.learnMore}>Learn More</Text>
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Art Exhibition Opening</Text>
          <Text>Date: February 10, 2024</Text>
          <Text>Time: 4:00 PM - 7:00 PM</Text>
          <Text style={styles.eventDescription}>Discover the world of contemporary art at our exhibition opening event.</Text>
          <Text style={styles.learnMore}>Learn More</Text>
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Culinary Workshop</Text>
          <Text>Date: March 20, 2024</Text>
          <Text>Time: 10:00 AM - 2:00 PM</Text>
          <Text style={styles.eventDescription}>Learn the art of cooking from expert chefs at our culinary workshop.</Text>
          <Text style={styles.learnMore}>Learn More</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: "serif",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  eventContainer: {
    flexDirection: 'column',
  },
  eventCard: {
    backgroundColor: '#E6F6E6',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  eventDescription: {
    color: '#333333',
    marginTop: 10,
  },
  learnMore: {
    color: '#689A7C',
    marginTop: 10,
  },
});

export default Upcomings;
