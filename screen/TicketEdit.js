import { StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import {db,doc}from "../firebase";
import { updateDoc } from 'firebase/firestore';

const TicketEdit = () => {

  const route=useRoute();

  const [userName, setUserName] = useState(route.params.data.userName);
  const [userSurName, setUserSurName] = useState(route.params.data.userSurName);
  const [kalkisHavalimani, setkalkisHavalimani] = useState(route.params.data.kalkisHavalimani);
  const [varisHavalimani, setvarisHavalimani] = useState(route.params.data.varisHavalimani);
  const [tarih, setTarih] = useState(route.params.data.tarih);
  const [kalkisSaati, setKalkisSaati] = useState(route.params.data.kalkisSaati);
  const [varisSaati, setVarisSaati] = useState(route.params.data.varisSaati);
  const [fiyat, setFiyat] = useState(route.params.data.fiyat);
  const [selectedSeat, setSelectedSeat] = useState(route.params.data.selectedSeat);

  const navigation = useNavigation();
  const ticketEdit=async()=>{
    try{
      const updateTicket = doc(db, "Ticket", route.params.id);
      await updateDoc(updateTicket, {
        userName: userName,
        userSurName: userSurName,
        kalkisHavalimani: kalkisHavalimani,
        varisHavalimani: varisHavalimani,
        tarih: tarih,
        kalkisSaati: kalkisSaati,
        varisSaati: varisSaati,
        fiyat: fiyat,
        selectedSeat: selectedSeat,
      })
      .then(()=>{
        alert("Bilet Başarıyla Güncellendi");
        navigation.navigate('TicketGet');
      }) 
    }catch(e){
      alert("Güncelleme başarısız,error"+e);
  }  
       
  }

  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Ticket Edit</Text>
    </View>
    <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          <TextInput onChangeText={(text) => setUserName(text)} value={userName} style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setUserSurName(text)} value={userSurName} style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setkalkisHavalimani(text)} value={kalkisHavalimani} style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setvarisHavalimani(text)} value={varisHavalimani}  style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setTarih(text)} value={tarih} style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setKalkisSaati(text)} value={kalkisSaati} style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setVarisSaati(text)} value={varisSaati} style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setSelectedSeat(text)} value={selectedSeat} style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setFiyat(text)} value={fiyat} style={styles.inputStyle} />
          <TouchableOpacity onPress={ticketEdit} style={styles.buttonStyle}>
            <Text style={{ color: '#fff' }}>Bilet'i Ekle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    <TouchableOpacity onPress={ticketEdit} style={styles.butonYukle}>
      <Text style={{color:'#fff'}}>Bilet'i Düzenle</Text>
    </TouchableOpacity>
  </View>); 
};
 
export default TicketEdit;

  const styles = StyleSheet.create({

    container: {
      flex: 1,
    },

    header: {
      height: 100, 
      width: '100%',
      backgroundColor: '#fff', 
      elevation: 5,
      paddingLeft:10,
      justifyContent:'center',
      paddingTop:30
    },

    headerText:{
      fontSize:18,
      fontWeight:'700',
    },

    inputStyle:{
      width:'90%',
      height:50,
      borderRadius:10,
      borderWidth:0.5,
      paddingLeft:20,
      paddingRight:20,
      marginTop:30,
      alignSelf:'center'
    },

    butonYukle:{
      backgroundColor:'#5246f2',
      width:'90%',
      height:50,
      borderRadius:10,
      alignSelf:'center',
      marginTop:20,
      justifyContent:'center',
      alignItems:'center'
    }

  });