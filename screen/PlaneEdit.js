import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import {db,update,updateDoc,collection,addDoc,getFirestore,app,auth,getDoc,doc,setDoc,getUser,uploadFile,ref,storage,getDownloadURL}from "../firebase";
import style from 'react-native-modal-picker/style';



const PlaneEdit = () => {

  const route=useRoute();
  const[Model,setModel]=useState(route.params.data.Model);
  const[koltukSayisi,setkoltukSayisi]=useState(route.params.data.koltukSayisi);

  const navigation = useNavigation();

  const planeEdit=async()=>{
    try{
      const updatePlane = doc(db, "Plane", route.params.id);
      await updateDoc(updatePlane, {
        Model:Model,
        koltukSayisi:koltukSayisi
      })
      .then(()=>{
        alert("Veriler Başarıyla Güncellendi");
        navigation.navigate('PlaneGet');
      }) 
    }catch(e){
      alert("Güncelleme başarısız,error"+e);
  }  
       
  }

  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Airplane Edit</Text>
    </View>
    <TextInput onChangeText={(text) => setModel(text)} value={Model} placeholder='Uçak Modeli'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setkoltukSayisi(text)} value={koltukSayisi} placeholder='Koltuk Sayisi'style={styles.inputStyle}/>
    <TouchableOpacity onPress={planeEdit} style={styles.butonYukle}>
      <Text style={{color:'#fff'}}>Uçak Modeli'ni Düzenle</Text>
    </TouchableOpacity>
  </View>); 
};
 
export default PlaneEdit;

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