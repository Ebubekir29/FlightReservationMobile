import { StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import {db,update,updateDoc,collection,addDoc,getFirestore,app,auth,getDoc,doc,setDoc,getUser,uploadFile,ref,storage,getDownloadURL}from "../firebase";
import style from 'react-native-modal-picker/style';



const RouteEdit = () => {

  const route=useRoute();
  const[havalimaniKalkis, sethavalimaniKalkis]=useState(route.params.data.havalimaniKalkis);
  const[havalimaniVaris, sethavalimaniVaris]=useState(route.params.data.havalimaniVaris);
  const[sehirKalkis, setsehirKalkis]=useState(route.params.data.sehirKalkis);
  const[sehirVaris, setsehirVaris]=useState(route.params.data.sehirVaris);
  const[ucakModel, setucakModel]=useState(route.params.data.ucakModel);
  const[tarihKalkis, settarihKalkis]=useState(route.params.data.tarihKalkis);
  const[saatKalkis, setsaatKalkis]=useState(route.params.data.saatKalkis);
  const[saatVaris, setsaatVaris]=useState(route.params.data.saatVaris);
  const[biletFiyat, setbiletFiyat]=useState(route.params.data.biletFiyat);

  const navigation = useNavigation();

  const routeEdit=async()=>{
    try{
      const updateRoute = doc(db, "Route", route.params.id);
      await updateDoc(updatePlane, {
        havalimaniKalkis: havalimaniKalkis,
        havalimaniVaris: havalimaniVaris,
        sehirKalkis: sehirKalkis,
        sehirVaris: sehirVaris,
        ucakModel: ucakModel,
        tarihKalkis: tarihKalkis,
        saatKalkis: saatKalkis,
        saatVaris: saatVaris,
        biletFiyat: biletFiyat
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
    <TextInput onChangeText={(text) => sethavalimaniKalkis(text)} value={havalimaniKalkis} placeholder='Kalkış Havalimanı'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => sethavalimaniVaris(text)} value={havalimaniVaris} placeholder='Varış Havalimanı'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setsehirKalkis(text)} value={sehirKalkis} placeholder='Kalkış Şehri'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setsehirVaris(text)} value={sehirVaris} placeholder='Varış Şehri'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setucakModel(text)} value={ucakModel} placeholder='Uçak Modeli'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => settarihKalkis(text)} value={tarihKalkis} placeholder='Kalkış Tarihi'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setsaatKalkis(text)} value={saatKalkis} placeholder='Kalkış Saati'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setsaatVaris(text)} value={saatVaris} placeholder='Varış Saati'style={styles.inputStyle}/>
    <TextInput onChangeText={(text) => setbiletFiyat(text)} value={biletFiyat} placeholder='Bilet Fiyatı'style={styles.inputStyle}/>

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