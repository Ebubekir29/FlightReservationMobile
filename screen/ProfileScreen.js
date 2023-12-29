import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';
import { View, Text, ActivityIndicator,TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [role, setRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const navigation = useNavigation();

  const AirportGet=() =>{
    navigation.navigate('AirportGet')
  };

  const PlaneGet=() =>{
    navigation.navigate('PlaneGet')
  };

  const RouteGet=() =>{
    navigation.navigate('RouteGet')
  };

  const TicketGet=()=>{
    navigation.navigate('TicketGet')
  };

  const UserGet=()=>{
    navigation.navigate('UserGet')
  };



  useEffect(() => {
    const cleanUp = onAuthStateChanged(auth, async (user) => { // kullanıcı giris tetiklendi
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);  
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) { 
            const userData = userDoc.data();
            setRole(userData.role);             //role bilgisi alınır 
            setUserEmail(userData.userEmail);   //e mail bilgisi alınır
          } else {
            console.log('Kullanici rol bulunamadi.');
          }
        } catch (error) {
          console.error( error);
        }
      } else {
        console.log('Error');
      }
    });

    return () => cleanUp();
  }, []);

  

  const renderViewByRole = () => {
    if (role === 'admin') {
      return (
        <View style={{marginTop:'30%', alignItems:'center', justifyContent:'center'}}>
           <Text style={styles.Text}>{role}</Text>
           <Text style={styles.Text}>{userEmail}</Text>
        
        <TouchableOpacity onPress={AirportGet} style={styles.butonYukle}>
          <Text style={styles.buttonText}>Havalimanı Listele</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={PlaneGet} style={styles.butonYukle}>
          <Text style={styles.buttonText}>Uçak Modeli Listele</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={RouteGet} style={styles.butonYukle}>
          <Text style={styles.buttonText}>Rotaları Listele</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={TicketGet} style={styles.butonYukle}>
          <Text style={styles.buttonText}>Biletleri Listele</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={UserGet} style={styles.butonYukle}>
          <Text style={styles.buttonText}>Kullanıcıları Listele</Text>
        </TouchableOpacity>

        </View>
      
      );
    } else if (role === 'user') {
      return (
        <View style={{marginTop:'30%', alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.Text}>{role}</Text>
          <Text style={styles.Text}>{userEmail}</Text> 
        </View>
      );
    } else {
      return;
    }
  };

  return (
    <View>
      {role ? (   // Bir role degeri varsa renderViewByRole fonksiyonu calisir.
        renderViewByRole() 
      ) : (
        <ActivityIndicator size="large" color="#0000ff" /> 
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    flexDirection:'column',
  },
  Text: {
    flexDirection:'column',
    fontSize: 25,
    marginTop:5,
    marginBottom:10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
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
  butonYukle:{
    backgroundColor:'#5246f2',
    width:'90%',
    height:50,
    borderRadius:10,
    alignSelf:'center',
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'
  },

});
export default ProfileScreen;
