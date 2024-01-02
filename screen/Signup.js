import React, { useState } from 'react';
import { Alert, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, doc, setDoc } from "../firebase";

const auth = getAuth();
const SignupScreen = () => {
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [phone, setPhone] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigation = useNavigation();

  const SignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        Alert.alert("Hesap Oluşturuldu.")
        const user = userCredential.user;
        const userUID = user.uid;
        const userName = name;
        const userSurName = surName;
        const userPhone = phone;
        const userTcNo = tcNo;
        const userEmail = email;
        const userSifre = password;
        const userDoc = doc(db, 'users', userUID);
        try {
          await setDoc(userDoc, {
            userUID: userUID,
            userName: userName,
            userSurName: userSurName,
            userPhone: userPhone,
            userTcNo: userTcNo,
            userEmail: userEmail,
            userSifre: userSifre,
            role: 'user',
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

  return (
    <KeyboardAvoidingView style={styles.container} >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <TextInput onChangeText={(text) => setName(text)} placeholder="Ad" style={styles.inputs} />
          <TextInput onChangeText={(text) => setSurName(text)} placeholder="Soyad" style={styles.inputs} />
          <TextInput onChangeText={(text) => setEmail(text)} placeholder="E-mail" style={styles.inputs} />
          <TextInput onChangeText={(text) => setPhone(text)} placeholder="Telefon" style={styles.inputs} />
          <TextInput onChangeText={(text) => setTcNo(text)} placeholder="Tc No" style={styles.inputs} />
          <TextInput onChangeText={(text) => setPassword(text)} placeholder="Şifre" secureTextEntry={true} style={styles.inputs} />
          <TouchableOpacity onPress={SignUp} style={styles.buttonSignup}>
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E2E2E',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  inputs: {
    borderRadius: 30,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2E2E2E',
    padding: 10,
    marginTop: 20,
    width: '100%',
  },
  buttonSignup: {
    marginTop: 30,
    width: 150,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E2E2E',
  },
  buttonText: {
    color: '#FAD02E',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
