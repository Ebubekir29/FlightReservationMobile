import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,Alert, TouchableOpacity } from 'react-native';
import { collection, query, where, doc, getDocs, getFirestore } from 'firebase/firestore';
import app from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Ucuslar = ({ route }) => {
  const { departureAirport, arrivalAirport, fiyat, selectedDate, kalkisSaati, varisSaati } = route.params;
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
  }, [departureAirport, arrivalAirport, fiyat, selectedDate, kalkisSaati, varisSaati]);

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
    const selectedFlight = ucuslar.find((item) => item.id === selectedFlightId);
    if (selectedFlight) {
      navigation.navigate("SeatSelection", { selectedFlight: selectedFlight.data });
    }
    else{
      Alert.alert("Lütfen ucus seciniz.")
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
    backgroundColor: 'lightgreen', // veya başka bir renk
  },
  column: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonSelectedUcus: {
    // Button stilini burada ekleyebilirsin
  },
  buttonText: {
    // Button text stilini burada ekleyebilirsin
  },
});

export default Ucuslar;
