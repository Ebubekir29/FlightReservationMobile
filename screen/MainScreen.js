

import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { collection, query, where, doc, getDocs, getFirestore } from 'firebase/firestore';
import app from '../firebase';

const MainScreen = ({ route,navigation }) => {
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const firestore = getFirestore(app);
  const{userName,userSurName} = route.params;
   const [ucuslar, setUcuslar] = useState([]);
  const [showSelectedDate, setShowSelectedDate] = useState(false);
  const formattedDate = selectedDate.toISOString().split('T')[0];
  
  useEffect(() => {
    const fetchUcuslar = async () => {
      try {
        const q = query(
          collection(firestore, 'ucuslar'),
          where('kalkisHavalimani', '==', departureAirport),
          where('varisHavalimani', '==', arrivalAirport),
          where('tarih', '==', formattedDate),
        );
        const querySnapshot = await getDocs(q);
        const yeniUcuslar = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
        setUcuslar(yeniUcuslar);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUcuslar();
  }, [departureAirport, arrivalAirport,selectedDate]);
 
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    setShowSelectedDate(true);
    hideDatePicker();
  };

    const SearchFlights = async () => {
      if (!departureAirport || !arrivalAirport || !selectedDate) {
        alert('Lütfen tüm alanları doldurun.');
        return;
      }
    
      try {
        const q = query(
          collection(firestore, 'ucuslar'),
          where('kalkisHavalimani', '==', departureAirport),
          where('varisHavalimani', '==', arrivalAirport),
          where('tarih', '==', formattedDate),
        );
    
        const querySnapshot = await getDocs(q);
        const yeniUcuslar = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
    
        if (yeniUcuslar.length === 0) {
          alert('Üzgünüz, uygun uçuş bulunamadı.');
        } else {
          navigation.navigate('Ucuslar', {
            departureAirport,
            arrivalAirport,
            selectedDate,
            userName,
            userSurName,
          });
        }
      } catch (error) {
        console.error(error);
        alert('Uçuşlar getirilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uçak Rezervasyonu</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Kalkış Havalimanı"
          value={departureAirport}
          onChangeText={(text) => setDepartureAirport(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Varış Havalimanı"
          value={arrivalAirport}
          onChangeText={(text) => setArrivalAirport(text)}
        />
        <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
          <Text style={styles.dateButtonText}>
            {showSelectedDate ? selectedDate.toDateString() : 'Tarih Seç'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={SearchFlights}>
        <Text style={styles.buttonText}>Uçuş Bul</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  },
  logo: {
    width: 500,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  dateButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  dateButtonText: {
    color: 'white',
    fontSize: 18,
  },
  searchButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MainScreen;