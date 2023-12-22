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
        <View style={{marginTop:'50%', alignItems:'center', justifyContent:'center'}}>
           <Text style={styles.Text}>{role}</Text>
           <Text style={styles.Text}>{userEmail}</Text>
          </View>
      
      );
    } else if (role === 'user') {
      return (
        <View style={{marginTop:'70%', alignItems:'center', justifyContent:'center'}}>
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
});
export default ProfileScreen;
