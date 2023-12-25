import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {db,collection,addDoc,getFirestore,app,auth,getDoc,doc,setDoc,getUser,uploadFile,ref,storage,getDownloadURL}from "../firebase";
import style from 'react-native-modal-picker/style';



const AirportCreate = () => {
  const[havalimaniAdi,sethavalimaniAdi]=useState('');
  const[kisaltma,setkisaltma]=useState('');
  const[sehir,setsehir]=useState('');
  const[ulke,setulke]=useState('');

  const navigation = useNavigation();

  const airportCreate=async()=>{
   try{
      const docRef = await addDoc(collection(db,"Airport"),{
        havalimaniAdi: havalimaniAdi,
        kisaltma: kisaltma,
        sehir: sehir,
        ulke:ulke
      });
      console.log('Airport added!');
      navigation.navigate('AirportGet');
    }catch(e){
      console.error("Error adding document",e);
  }  
   
    
  }

  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Airport Create</Text>
    </View>
    <TextInput onChangeText={(text) => sethavalimaniAdi(text)} placeholder='Havalimanı Adı'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setkisaltma(text)} placeholder='Havalimanı Kısaltma'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setsehir(text)} placeholder='Şehir'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setulke(text)} placeholder='Ülke'style={styles.inputStyle}/>

    <TouchableOpacity onPress={airportCreate} style={styles.butonYukle}>
      <Text style={{color:'#fff'}}>Havalimanı'nı Ekle</Text>
    </TouchableOpacity>
  </View>); 
};
 
export default AirportCreate;

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