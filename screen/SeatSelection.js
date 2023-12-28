import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import * as Notifications from "expo-notifications";
import { db, doc, setDoc,addDoc,collection } from "../firebase";
const SeatSelection = ({ route,navigation }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const { kalkisHavalimani,varisHavalimani,tarih,kalkisSaati,
    varisSaati,fiyat,userName,userSurName } = route.params;
  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  useEffect(() => {
    const requestPermissions = async () => {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) {
        console.log("permission not granted");
      }
    };

    requestPermissions();
  }, []);
 const handleProceedToMyTickets = async () => {
  try {
    const docRef = await addDoc(collection(db, "Ticket"), {
        userName        : userName,
        userSurName     : userSurName,
        kalkisHavalimani: kalkisHavalimani,
        varisHavalimani : varisHavalimani,
        kalkisSaati     : kalkisSaati,
        varisSaati      : varisSaati,
        tarih           : tarih,
        selectedSeat    : selectedSeat,
        fiyat           : fiyat
    });
  } catch (e) {
    console.error(e);
  }
    const notificationContent = {
      title: "BAŞARILI",
      body: "Bilet Alma işleminiz basarılı.İyi yolculuklar dileriz!",
      sound: true,
    };

    try {
      await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger: null,
      });
    } catch (error) {
      console.error('Bildirim gönderme hatası:', error);
    }
    navigation.navigate('MyTickets', { selectedSeat, kalkisHavalimani,varisHavalimani,tarih,kalkisSaati,varisSaati,fiyat
      ,userName,userSurName });
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
          title="Bilet olustur"
          onPress={handleProceedToMyTickets}
          color="#68BB59"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 21,
  },
  plane: {
    flex: 1,
  },
  fuselage: {
    marginTop: 60,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 3,
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
  },
});

export default SeatSelection;
