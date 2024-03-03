import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from './navbar'

const Contact = () => {
  return (
    <View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}>
            <Navbar></Navbar>
        </View>
      <Text>Contact</Text>
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({})