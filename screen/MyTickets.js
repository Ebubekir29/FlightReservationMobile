import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';
import { getFirestore,db, doc, getDoc,addDoc,collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const MyTickets = ({ route }) => {
  const { kalkisHavalimani, varisHavalimani, tarih, kalkisSaati, varisSaati, 
    fiyat, selectedSeat,userName,userSurName,userid } = route.params;
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const navigation = useNavigation();
 
  const handleHome = () => {
    navigation.navigate('Main');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleHome()} style={styles.HomeButton}>
            <Text style={styles.buttonText}>Ana Sayfa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogout()} style={styles.logoutButton}>
            <Text style={styles.buttonText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'darkgrey',
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
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
    color: '#333',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailText: {
    fontSize: 18,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  HomeButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    marginRight:10,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MyTickets;