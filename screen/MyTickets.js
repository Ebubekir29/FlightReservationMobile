import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { db, doc, setDoc } from "../firebase";
const MyTickets = ({ route }) => {
    const { kalkisHavalimani, varisHavalimani, tarih, kalkisSaati,
        userName,userSurName, varisSaati, fiyat, selectedSeat } = route.params;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.headerText}>Bilet Detayları</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Ad:</Text>
            <Text style={styles.detailText}>{userName}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Soyad:</Text>
            <Text style={styles.detailText}>{userSurName}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Kalkış Havalimanı:</Text>
            <Text style={styles.detailText}>{kalkisHavalimani}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Varış Havalimanı:</Text>
            <Text style={styles.detailText}>{varisHavalimani}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Tarih:</Text>
            <Text style={styles.detailText}>{tarih}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Kalkış Saati:</Text>
            <Text style={styles.detailText}>{kalkisSaati}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Varış Saati:</Text>
            <Text style={styles.detailText}>{varisSaati}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Koltuk:</Text>
            <Text style={styles.detailText}>{selectedSeat}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Fiyat:</Text>
            <Text style={styles.detailText}>{fiyat}</Text>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: '80%',
      padding: 20,
      borderRadius: 10,
      backgroundColor: 'lightblue',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    detailLabel: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    detailText: {
      fontSize: 18,
    },
  });
  
  export default MyTickets;