import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc} from 'firebase/firestore';
import app from '../firebase';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserSession } from './userService';

const ProfileScreen = () => {
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const navigation = useNavigation();

  const RouteGet = () => {
    navigation.navigate('RouteGet');
  };

  const TicketGet = () => {
    navigation.navigate('TicketGet');
  };

  const UserGet = () => {
    navigation.navigate('UserGet');
  };

  const HandleMyTickets = () => {
    navigation.navigate('Tickets', { userId: auth.currentUser.uid });
  };
  
  const HandleEditProfile = () => {
    navigation.navigate('EditProfile', { userId: auth.currentUser.uid });
  };
  const HandleLogOut = () => {

    auth.signOut().then(() => {
      console.log('Kullanıcı çıkış yaptı');

      navigation.navigate('Login'); 
    }).catch((error) => {
      console.error('Çıkış yaparken bir hata oluştu:', error.message);
    });
  };

  useEffect(() => {
    const cleanUp = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(firestore, 'users', await getUserSession());
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role);
            console.log(userData.userName);
            setUserName(userData.userName)
          } else {
            console.log('Kullanici rol bulunamadi.');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Error');
      }
    });
        navigation.navigate('Main');
    return () => cleanUp();
  }, []);

  const renderViewByRole = () => {
    if (role === 'admin') {
      return (
        <View style={{ marginTop: '30%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.Text}>Merhaba, {userName}</Text>

          <TouchableOpacity onPress={RouteGet} style={styles.butonYukle}>
            <Text style={styles.buttonText}>Rotaları Listele</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={TicketGet} style={styles.butonYukle}>
            <Text style={styles.buttonText}>Biletleri Listele</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={UserGet} style={styles.butonYukle}>
            <Text style={styles.buttonText}>Kullanıcıları Listele</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={HandleLogOut} style={styles.butonYukle}>
            <Text style={styles.buttonText}>Cikis Yap</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (role === 'user') {
      return (
        <View style={{ marginTop: '30%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.Text}>Merhaba,  {userName}</Text>
          <TouchableOpacity onPress={HandleMyTickets} style={styles.butonYukle}>
            <Text style={styles.buttonText}>Biletlerim</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={HandleEditProfile} style={styles.butonYukle}>
            <Text style={styles.buttonText}>Profil Düzenle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={HandleLogOut} style={styles.butonYukle}>
            <Text style={styles.buttonText}>Cikis Yap</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return;
    }
  };

  return (
    <View>
      {role ? (
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
    flexDirection: 'column',
    fontSize: 25,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  butonYukle: {
    backgroundColor: '#5246f2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
