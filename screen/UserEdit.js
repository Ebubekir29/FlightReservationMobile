import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import {db,update,updateDoc,collection,addDoc,getFirestore,app,auth,getDoc,doc,setDoc,getUser,uploadFile,ref,storage,getDownloadURL}from "../firebase";
import style from 'react-native-modal-picker/style';

const UserEdit = () => {

  const route=useRoute();
  const [adi, setadi] = useState(route.params.data.Adi);;
  const [soyadi, setsoyadi] = useState(route.params.data.Soyadi);
  const [telefon, settelefon] = useState(route.params.data.Telefon);
  const [tcNo, setTcNo] = useState(route.params.data.TcNo);
  const [email, setEmail] = useState(route.params.data.Email);
  const [password, setPassword] = useState(route.params.data.Password);
  const [role, setRole] = useState(route.params.data.Role);


  const navigation = useNavigation();

  const userEdit=async()=>{
    try{
      const updateUser = doc(db, "users", route.params.id);
      await updateDoc(updateUser, {
        Adi: adi,
        Soyadi: soyadi,
        Telefon: telefon,
        TcNo: tcNo,
        Email: email,
        Password: password,
        Role: role
      })
      .then(()=>{
        alert("Veriler Başarıyla Güncellendi");
        navigation.navigate('UserGet');
      }) 
    }catch(e){
      alert("Güncelleme başarısız,error"+e);
  }  
       
  }

  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>User Edit</Text>
    </View>
    <TextInput onChangeText={(text) => setadi(text)} placeholder="Ad" value={adi} style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setsoyadi(text)} placeholder="Soyad" value={soyadi} style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setEmail(text)} placeholder="E-mail" value={email} style={styles.inputStyle} />
      <TextInput onChangeText={(text) => settelefon(text)} placeholder="Telefon" value={telefon} style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setTcNo(text)} placeholder="Tc No" value={tcNo} style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setPassword(text)} placeholder="Şifre" value={password} secureTextEntry={true} style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setRole(text)} placeholder="Role" value={role} style={styles.inputStyle} />


    <TouchableOpacity onPress={userEdit} style={styles.butonYukle}>
      <Text style={{color:'#fff'}}>Kullanıcı'yı Düzenle</Text>
    </TouchableOpacity>
  </View>); 
};
 
export default UserEdit;

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