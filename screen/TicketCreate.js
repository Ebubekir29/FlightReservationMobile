import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { db, doc, setDoc, addDoc, collection } from "../firebase";

const TicketCreate = () => {
  const [userName, setUserName] = useState('');
  const [userSurName, setUserSurName] = useState('');
  const [kalkisHavalimani, setkalkisHavalimani] = useState('');
  const [varisHavalimani, setvarisHavalimani] = useState('');
  const [tarih, setTarih] = useState('');
  const [kalkisSaati, setKalkisSaati] = useState('');
  const [varisSaati, setVarisSaati] = useState('');
  const [fiyat, setFiyat] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState('');

  const navigation = useNavigation();

  const ticketCreate = async () => {
    try {
      const docRef = await addDoc(collection(db, "Ticket"), {
        userName: userName,
        userSurName: userSurName,
        kalkisHavalimani: kalkisHavalimani,
        varisHavalimani: varisHavalimani,
        tarih: tarih,
        kalkisSaati: kalkisSaati,
        varisSaati: varisSaati,
        fiyat: fiyat,
        selectedSeat: selectedSeat,
      });
      console.log('Ticket added!');
      navigation.navigate('Profile');
    } catch (e) {
      console.error("Error adding document", e);
    }
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ticket Create</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          <TextInput onChangeText={(text) => setUserName(text)} placeholder='Yolcu Adı' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setUserSurName(text)} placeholder='Yolcu Soyadı' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setkalkisHavalimani(text)} placeholder='Kalkış Havalimanı' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setvarisHavalimani(text)} placeholder='Varış Havalimanı' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setTarih(text)} placeholder='Kalkış Tarihi' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setKalkisSaati(text)} placeholder='Kalkış Saati' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setVarisSaati(text)} placeholder='Varış Saati' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setSelectedSeat(text)} placeholder='Koltuk No' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setFiyat(text)} placeholder='Bilet Fiyatı' style={styles.inputStyle} />
          <TouchableOpacity onPress={ticketCreate} style={styles.buttonStyle}>
            <Text style={{ color: '#fff' }}>Bilet Ekle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default TicketCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    paddingLeft: 10,
    justifyContent: 'center',
    paddingTop: 30
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: 'center'
  },
  buttonStyle: {
    backgroundColor: '#5246f2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  }
});
