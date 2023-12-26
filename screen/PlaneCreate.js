import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { db,addDoc,collection,doc,setDoc } from "../firebase"; 
import style from 'react-native-modal-picker/style';


const PlaneCreate = () => {
  const[Model,setModel]=useState('');
  const[koltukSayisi,setkoltukSayisi]=useState('');
  const navigation = useNavigation();

  const planeCreate=async()=>{
    try{
      const docRef = await addDoc(collection(db,"Plane"),{
        Model: Model,
        koltukSayisi: koltukSayisi,
      });
      alert("Uçak modeli başarıyla eklendi");
      navigation.navigate('AirportGet');
    }catch(e){
      console.error("Error adding document",e);
    }
    
  
  }

  
  
  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Plane Create</Text>
    </View>
    <TextInput onChangeText={(text) => setModel(text)} placeholder='Uçak Modeli'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) =>setkoltukSayisi(text)} placeholder='Koltuk Sayısı'style={styles.inputStyle}/>
    <TouchableOpacity onPress={planeCreate} style={styles.butonYukle}>
      <Text style={{color:'#fff'}}>Uçak Modeli'ni Ekle</Text>
    </TouchableOpacity>
  </View>); 
};

export default PlaneCreate;

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