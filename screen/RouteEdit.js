import { StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import {db,doc}from "../firebase";
import { updateDoc } from 'firebase/firestore';

const RouteEdit = () => {

  const route=useRoute();
  const [kalkisHavalimani, setkalkisHavalimani] = useState(route.params.data.kalkisHavalimani);
  const [varisHavalimani, setvarisHavalimani] = useState(route.params.data.varisHavalimani);
  const [tarih, setTarih] = useState(route.params.data.tarih);
  const [kalkisSaati, setKalkisSaati] = useState(route.params.data.kalkisSaati);
  const [varisSaati, setVarisSaati] = useState(route.params.data.varisSaati);
  const [fiyat, setFiyat] = useState(route.params.data.fiyat);
  const navigation = useNavigation();

  const routeEdit=async()=>{
    try{
      const updateRoute = doc(db, "ucuslar", route.params.id);
      await updateDoc(updateRoute, {
        kalkisHavalimani: kalkisHavalimani,
        varisHavalimani: varisHavalimani,
        tarih: tarih,
        kalkisSaati: kalkisSaati,
        varisSaati: varisSaati,
        fiyat: fiyat,
      })
      .then(()=>{
        alert("Veriler Başarıyla Güncellendi");
        navigation.navigate('RouteGet');
      }) 
    }catch(e){
      alert("Güncelleme başarısız,error"+e);
  }  
       
  }

  return (
   
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Route Edit</Text>
    </View>
    <ScrollView style={styles.container}>
    <TextInput onChangeText={(text) => setkalkisHavalimani(text)} value={kalkisHavalimani} style={styles.inputStyle} />
    <TextInput onChangeText={(text) => setvarisHavalimani(text)} value={varisHavalimani}  style={styles.inputStyle} />
    <TextInput onChangeText={(text) => setTarih(text)} value={tarih} style={styles.inputStyle} />
    <TextInput onChangeText={(text) => setKalkisSaati(text)} value={kalkisSaati} style={styles.inputStyle} />
    <TextInput onChangeText={(text) => setVarisSaati(text)} value={varisSaati} style={styles.inputStyle} />
    <TextInput onChangeText={(text) => setFiyat(text)} value={fiyat} style={styles.inputStyle} />
    <TouchableOpacity onPress={routeEdit} style={styles.butonYukle}>
      <Text style={{color:'#fff'}}>Rota'yı Düzenle</Text>
    </TouchableOpacity>
    </ScrollView>
    
  </View>); 
};
 
export default RouteEdit;

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