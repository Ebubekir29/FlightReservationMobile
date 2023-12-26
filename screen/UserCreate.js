import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { db, addDoc, collection, doc, setDoc } from "../firebase";
import style from 'react-native-modal-picker/style';


const UserCreate = () => {
  const [adi, setadi] = useState("");;
  const [soyadi, setsoyadi] = useState("");
  const [telefon, settelefon] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigation = useNavigation();


  const userCreate = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        Adi: adi,
        Soyadi: soyadi,
        Telefon: telefon,
        TcNo: tcNo,
        Email: email,
        Password: password,
        Role: role
      });
      console.log('User added!');
      alert("Kullanıcı Başarıyla Oluşturuldu.");
    } catch (e) {
      console.error("Error adding document", e);
    }

  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Create</Text>
      </View>
      <TextInput onChangeText={(text) => setadi(text)} placeholder="Ad" style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setsoyadi(text)} placeholder="Soyad" style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setEmail(text)} placeholder="E-mail" style={styles.inputStyle} />
      <TextInput onChangeText={(text) => settelefon(text)} placeholder="Telefon" style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setTcNo(text)} placeholder="Tc No" style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setPassword(text)} placeholder="Şifre" secureTextEntry={true} style={styles.inputStyle} />
      <TextInput onChangeText={(text) => setRole(text)} placeholder="Role" style={styles.inputStyle} />
      <TouchableOpacity onPress={userCreate} style={styles.butonYukle}>
        <Text style={{ color: '#fff' }}>Kullanıcı'yı Ekle</Text>
      </TouchableOpacity>
    </View>);
};

export default UserCreate;

const styles = StyleSheet.create({

  container: {
    flex: 1,
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

  butonYukle: {
    backgroundColor: '#5246f2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }


});