import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Button } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import app from "../firebase";

const MainScreen = () => {
  const [departureAirport, setKalkisHavalimani] = useState('');
  const [arrivalAirport, setVarisHavalimani] = useState('');
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [ucuslar, setUcuslar] = useState([]);
  const firestore = getFirestore(app);
  const [date, setDate] = useState(new Date());
  const [showSelectedDate, setShowSelectedDate] = useState(false);
  const formattedDate = date.toISOString().split('T')[0];

  const handleUcusBul = async () => {
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
  
        
        if (yeniUcuslar.length === 0) {
          alert('Uygun uçuş bulunamadı. Lütfen başka bir tarih veya rota seçin.');
          navigation.navigate('Main');
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUcuslar();
    navigation.navigate('Ucuslar', {
      departureAirport,
      arrivalAirport,
      formattedDate,
    });
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    console.log('Selected Date:', currentDate);
  };
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode('date');
    setShowSelectedDate(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Kalkış Havalimanı:</Text>
        <ModalSelector
          data={[
            { key: 0, label: 'Istanbul', value: 'Istanbul' },
            { key: 1, label: 'Ankara', value: 'Ankara' },
          ]}
          initValue={departureAirport}
          onChange={(option) => setKalkisHavalimani(option.value)}
          animationType="slide"
          optionTextStyle={{ color: '#3498db' }}
        />

        <Text style={styles.label}>Varış Havalimanı:</Text>
        <ModalSelector
          data={[
            { key: 0, label: 'Ankara', value: 'Ankara' },
            { key: 1, label: 'Istanbul', value: 'Istanbul' },
          ]}
          initValue={arrivalAirport}
          onChange={(option) => setVarisHavalimani(option.value)}
          animationType="slide"
          optionTextStyle={{ color: '#3498db' }}
        />
        <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
          <Text style={styles.dateButtonText}>
            {showSelectedDate ? formattedDate : 'Tarih Seç'}
          </Text>
        </TouchableOpacity>
      </View>
     
      <TouchableOpacity style={styles.ucusBulButton} onPress={handleUcusBul}>
        <Text style={styles.buttonText}>Uçuş Bul</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2c3e50',
  },
  dateText: {
    fontSize: 16,
    marginBottom: 16,
    color: '#2c3e50',
    textAlign: 'center',
  },
  ucusBulButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  dateButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth:1,
    borderColor:'grey',
    marginTop:10,
    alignItems:'center',
  },
  dateButtonText: {
    color: 'black',
    fontSize: 18,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MainScreen;


