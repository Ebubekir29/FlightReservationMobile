import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,Alert, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import app from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Ucuslar = ({ route }) => {
  const { departureAirport, arrivalAirport, fiyat, formattedDate,
    kalkisSaati, varisSaati } = route.params;
  const [ucuslar, setUcuslar] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const firestore = getFirestore(app);
  const navigation = useNavigation();
  console.log("asada",formattedDate)
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
  }, [departureAirport, arrivalAirport,formattedDate]);

  const handleLogout = () => {
    navigation.navigate('Login')
  };
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
     <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={selectedUcus} style={styles.buttonSelected}>
          <Text style={styles.buttonText}>Devam Et</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogout()} style={styles.buttonSelected}>
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 0,
    backgroundColor: 'lightgrey',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    marginTop: 20,
  },
  buttonSelected: {
    backgroundColor: 'darkblue', 
    padding: 13,
    borderRadius: 10,
    marginTop: 20, 
    alignSelf: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center', 
  },
  logoutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default Ucuslar;
