import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';
import * as Notifications from "expo-notifications";
import { db, setDoc, addDoc, collection } from "../firebase";
import { getUserSession } from './userService';

const SeatSelection = ({ route, navigation }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const { kalkisHavalimani, varisHavalimani, tarih, kalkisSaati, varisSaati, fiyat } = route.params;
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const [userId, setId] = useState(null);
  const [userid, setid] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userSurName, setUserSurName] = useState(null);
  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    const requestPermissions = async () => {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) {
        console.log("Permission not granted");
      }
      const cleanUp = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDocRef = doc(firestore, 'users', await getUserSession());
          try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setid(user.uid);
              setUserName(userData.userName);
              setUserSurName(userData.userSurName);
            } else {
              console.log('Kullanıcı ad ve soyad bulunamadı.');
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('Error');
        }
      });
      return () => cleanUp();
    };

    requestPermissions();
  }, []);

  const handleProceedToMyTickets = async () => {
    navigation.navigate('Payment', { selectedSeat, kalkisHavalimani,varisHavalimani,tarih,kalkisSaati,varisSaati,fiyat
      ,userName,userSurName,userid });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.plane}>
        <View style={styles.fuselage}>
          <View style={styles.exitContainer}>
            <Text style={styles.exitText}>EXIT</Text>
            <View style={styles.fuselage}></View>
          </View>
          {Array.from({ length: 10 }, (_, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.seats}>
                {['A', 'B', 'C', 'D', 'E', 'F'].map((seat, seatIndex) => (
                  <TouchableOpacity
                    key={seatIndex}
                    style={[
                      styles.seat,
                      selectedSeat === `${index + 1}${seat}` && { backgroundColor: '#68BB59' },
                      seatIndex === 2 ? { marginRight: 40 } : null,
                    ]}
                    onPress={() => handleSeatSelection(`${index + 1}${seat}`)}
                  >
                    <Text style={styles.seatLabel}>{`${index + 1}${seat}`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          <View style={styles.exitContainer}>
            <Text style={styles.exitText}>EXIT</Text>
            <View style={styles.fuselage}></View>
          </View>
        </View>
      </View>
      {selectedSeat && (
        <Button
          title="Ödeme sayfasına git"
          onPress={handleProceedToMyTickets}
          color="darkblue"
        />
      )}
       <TouchableOpacity onPress={() => handleLogout()} style={styles.logoutButton}>
          <Text style={styles.buttonText}>Çıkış Yap</Text>
       </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 21,
    backgroundColor: 'white', 
  },
  plane: {
    flex: 1,
  },
  fuselage: {
    marginTop: 60,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 3,
    backgroundColor: 'lightgrey',
  },
  row: {
    flexDirection: 'row',
  },
  seats: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  exitText: {
    fontSize: 14,
    lineHeight: 18,
    paddingVertical: 2,
    backgroundColor: 'green',
    color: 'white',
    position: 'absolute',
    top: '100%',
    transform: [{ translateY: -30 }],
    },
    seat: {
    flex: 0,
    width: '13.5%',
    height: '80%',
    padding: 5,
    margin: 2,
    backgroundColor: '#F42536',
    borderRadius: 5,
    },
    seatLabel: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 24,
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
    color: 'white',
    },
    logoutButton: {
    backgroundColor: 'darkblue',
    padding: 10,
    alignSelf: 'center',
    marginTop: 30,
    width: '100%',
    },
    buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf:'center',
    },
    });

export default SeatSelection;
