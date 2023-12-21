import React, { useState } from 'react';
import {Alert, TouchableOpacity,StyleSheet,TextInput,KeyboardAvoidingView,ScrollView,View, Text } from 'react-native';
import 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { db,doc,setDoc } from "../firebase"; 

const auth = getAuth();
const SignupScreen = () => {
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [phone, setPhone] = useState("");
  const [tcNo, setTcNo] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const SignUp = () => {
    createUserWithEmailAndPassword(auth,email, password)
      .then(async(userCredential) => {
        Alert.alert("Hesap Olusturuldu.")
        const user = userCredential.user;
        const userUID = user.uid;
        const userName = name;
        const userSurName = surName;
        const userPhone = phone;
        const userTcNo = tcNo;
        const userEmail = email;
        const userSifre = password;
        const role = role;
        const userDoc = doc(db, 'users', userUID);
          try {
            await setDoc(userDoc, {
              userUID    : userUID,
              userName   : userName,
              userSurName: userSurName,
              userPhone  : userPhone,
              userTcNo   : userTcNo,
              userEmail  : userEmail,
              userSifre  : userSifre,
              role       : 'user',  
            });
          } catch (e) {
            console.error(e);
          }  
        navigation.navigate('Login');    
      })
      .catch(error => {
        console.log(error)
        Alert.alert("Error", error.message); 
      });
  };
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView >
      <ScrollView >
        <View style={styles.container}>
        <Text style={styles.title}>Kayıt Ol</Text>
          <View style={{flex:1, width:'80%',alignItems:'center'}}>    
          <TextInput onChangeText={(text) => setName(text)} placeholder="Ad" style={styles.inputs} />
          <TextInput onChangeText={(text) => setSurName(text)} placeholder="Soyad" style={styles.inputs} />
          <TextInput onChangeText={(text) => setEmail(text)} placeholder="E-mail" style={styles.inputs} />
          <TextInput onChangeText={(text) => setPhone(text)} placeholder="Telefon" style={styles.inputs} />
          <TextInput onChangeText={(text) => setTcNo(text)} placeholder="Tc No" style={styles.inputs} /> 
          <TextInput onChangeText={(text) => setPassword(text)} placeholder="Şifre" secureTextEntry={true} style={styles.inputs} />
          <View style={{flexDirection:'row'}}> 
          </View>
          <TouchableOpacity onPress={SignUp} style={styles.buttonLogin}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blueviolet',
    marginTop: 50,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:10,
  },
  inputs:{
   
    borderRadius: 30,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 30,
    width:'100%',
  },
  buttonLogin: {
   marginTop:20,
    width: 150,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3081D0',
    
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});