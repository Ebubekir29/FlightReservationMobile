import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,Alert, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import app from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Ucuslar = ({ route }) => {
  const { departureAirport, arrivalAirport, fiyat, selectedDate, 
    kalkisSaati, varisSaati,userName,userSurName } = route.params;
  const [ucuslar, setUcuslar] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const firestore = getFirestore(app);
  const navigation = useNavigation();
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
  }, [departureAirport, arrivalAirport, selectedDate]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRowPress(item)}>
      <View style={[styles.tableRow, item.id === selectedFlightId && styles.selectedRow]} key={item.id}>
        <Text style={styles.column}>{item.data.kalkisHavalimani} {'\n'} {item.data.kalkisSaati}</Text>
        <Text style={styles.column}>{item.data.varisHavalimani} {'\n'} {item.data.varisSaati}</Text>
        <Text style={styles.column}>{item.data.tarih}</Text>
        <Text style={styles.column}>{item.data.fiyat}</Text>
      </View>
    </TouchableOpacity>
  );

  const selectedUcus = () => {
    const selectedFlight = ucuslar.find((item) => item.id === selectedFlightId)?.data;

    if (selectedFlight) {
      navigation.navigate('SeatSelection', {
        kalkisHavalimani: selectedFlight.kalkisHavalimani,
        varisHavalimani: selectedFlight.varisHavalimani,
        kalkisSaati: selectedFlight.kalkisSaati,
        varisSaati: selectedFlight.varisSaati,
        tarih: selectedFlight.tarih,
        fiyat: selectedFlight.fiyat,
        userName,
        userSurName,
      });
    } else {
      Alert.alert('Uçuş Seçilmedi', 'Lütfen bir uçuş seçin.');
    }
  };

  const handleRowPress = (item) => {
    setSelectedFlightId(item.id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ucuslar}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Kalkış</Text>
            <Text style={styles.columnHeader}>Varış</Text>
            <Text style={styles.columnHeader}>Tarih</Text>
            <Text style={styles.columnHeader}>Fiyat</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={selectedUcus} style={styles.buttonSelectedUcus}>
        <Text style={styles.buttonText}>Devam et</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 0,
    backgroundColor: 'orange',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  selectedRow: {
    backgroundColor: 'lightgreen',
  },
  column: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonSelectedUcus: {
    backgroundColor: '#3498db', 
    padding: 20,
    borderRadius: 10,
    marginTop: 20, 
    alignSelf: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center', // Ortaya hizalama
  },
});

export default Ucuslar;
