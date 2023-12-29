import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';
import { Alert,KeyboardAvoidingView,ImageBackground,StyleSheet, Text, View, TextInput , TouchableOpacity} from 'react-native';
import { getAuth,signInWithEmailAndPassword} from "firebase/auth";

const auth = getAuth();
const firestore = getFirestore(app);
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Login = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const docRef = doc(firestore, "users", userCredential.user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            Alert.alert("Login Succesfull.")
            const user = userCredential.user;
            console.log(user.email);
            const userData = docSnap.data();
            const {userName,userSurName} = userData;
            console.log(userName);
            navigation.navigate('Main', { userName, userSurName });     
            setEmail("");
            setPassword("");   
          } else {      
            Alert.alert("Tekrar Deneyin") 
              navigation.navigate('Login');
          }
      })
      .catch(error => {
        Alert.alert("Error", error.message); 
      });
  };
  
  const navigation = useNavigation();

  const Signup = () => {
    navigation.navigate('Signup'); 
  };
  return (
    <KeyboardAvoidingView 
      style={{flex:1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

    ><ImageBackground
        style={styles.imageBackground}
        resizeMode="contain"
        source={require('../assets/ucak.jpeg')}
      ></ImageBackground>
      
      <View style={styles.container}>
        <Text style={styles.title}>Ucak Rezesvasyon Sistemi</Text>
        <TextInput onChangeText={text =>setEmail(text)} value={email} placeholder="E-mail" style={styles.loginInput} />
        <TextInput onChangeText={text =>setPassword(text)} value={password} placeholder="Şifre"   style={styles.loginInput} secureTextEntry={true}/>
        <View style={styles.container}>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={Login} style={styles.buttonLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={Signup} style={styles.buttonSignup}>
          <Text style={styles.buttonText}  >Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
        </View>
        </View>
        <StatusBar style="auto" />     
    </KeyboardAvoidingView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    height:'50%'
  },
  imageBackground: {
    flex:1,
    marginTop:10,
    height:'100%',
    backgroundColor:'white',
    
  },
  title: {
    marginTop: -20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181818',
    padding: 10
    
  },
  loginInput: {
    borderRadius: 30,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '80%',
    marginTop: 10,
    
  },
  forgotPassword: {
    marginBottom:10,
    marginLeft: '50%',
    marginTop:20,
    
  },
  forgotPasswordText: {
    color: 'gray',
  },
  buttonsContainer: {
   
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '10%',
    marginTop:10,
  },
  buttonLogin: {
   
    width: 350,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3081D0',
    
  },
  buttonSignup: {
    width: 350,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3081D0',
    marginTop:10,
    marginBottom:15,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
