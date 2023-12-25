import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import {db,update,updateDoc,collection,addDoc,getFirestore,app,auth,getDoc,doc,setDoc,getUser,uploadFile,ref,storage,getDownloadURL}from "../firebase";
import style from 'react-native-modal-picker/style';

const AirportEdit = () => {

  const route=useRoute();
  const[havalimaniAdi,sethavalimaniAdi]=useState(route.params.data.havalimaniAdi);
  const[kisaltma,setkisaltma]=useState(route.params.data.kisaltma);
  const[sehir,setsehir]=useState(route.params.data.sehir);
  const[ulke,setulke]=useState(route.params.data.ulke);

  const navigation = useNavigation();

  const airportEdit=async()=>{
    try{
      const updateAirport = doc(db, "Airport", route.params.id);
      await updateDoc(updateAirport, {
        havalimaniAdi: havalimaniAdi,
        kisaltma: kisaltma,
        sehir: sehir,
        ulke:ulke
      })
      .then(()=>{
        alert("Veriler Başarıyla Güncellendi");
        navigation.navigate('AirportGet');
      }) 
    }catch(e){
      alert("Güncelleme başarısız,error"+e);
  }  
       
  }

  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Airport Edit</Text>
    </View>
    <TextInput onChangeText={(text) => sethavalimaniAdi(text)} value={havalimaniAdi} placeholder='Havalimanı Adı'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setkisaltma(text)} value={kisaltma} placeholder='Havalimanı Kısaltma'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setsehir(text)} value={sehir} placeholder='Şehir'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setulke(text)} value={ulke} placeholder='Ülke'style={styles.inputStyle}/>

    <TouchableOpacity onPress={airportEdit} style={styles.butonYukle}>
      <Text style={{color:'#fff'}}>Havalimanı'nı Düzenle</Text>
    </TouchableOpacity>
  </View>); 
};
 
export default AirportEdit;

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