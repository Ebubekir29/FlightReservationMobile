import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import {db,doc}from "../firebase";
import { updateDoc } from 'firebase/firestore';

const UserEdit = () => {

  const route=useRoute();
  const [userName, setUserName] = useState(route.params.data.userName);;
  const [userSurName, setUserSurName] = useState(route.params.data.userSurName);
  const [userPhone, setuserPhone] = useState(route.params.data.userPhone);
  const [userTcNo, setUserTcNo] = useState(route.params.data.userTcNo);
  const [userEmail, setUserEmail] = useState(route.params.data.userEmail);
  const [userSifre, setUserSifre] = useState(route.params.data.userSifre);
  const [role, setRole] = useState(route.params.data.role);

  const navigation = useNavigation();
  const userEdit=async()=>{
    try{
      const updateUser = doc(db, "users", route.params.id);
      await updateDoc(updateUser, {
        userName: userName,
        userSurName: userSurName,
        userPhone: userPhone,
        userTcNo: userTcNo,
        userEmail: userEmail,
        userSifre: userSifre,
        role: role
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
      <TextInput onChangeText={(text) => setUserName(text)} value={userName} style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setUserSurName(text)} value={userSurName}  style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setUserEmail(text)} value={userEmail}  style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setuserPhone(text)} value={userPhone}  style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setUserTcNo(text)} value={userTcNo}  style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setUserSifre(text)} value={userSifre} style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setRole(text)} value={role}  style={styles.inputStyle} />


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