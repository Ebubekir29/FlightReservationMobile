import React, { useState } from 'react';
import { View, Text, StyleSheet,Alert, TouchableOpacity,TextInput } from 'react-native';
import { query, where, getDocs, getFirestore } from 'firebase/firestore';
import app,{collection,addDoc,db} from '../firebase';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
const MyTickets = ({ route }) => {
    const { kalkisHavalimani, varisHavalimani, tarih,
         kalkisSaati, varisSaati, fiyat,userName,userSurName,selectedSeat,userid } = route.params;
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [payments, setPayments] = useState([]);
    const firestore = getFirestore(app);
  const navigation = useNavigation();
    

  const handlePayment = () => {
    const fetchUcuslar = async () => {
        try {
          const q = query(
            collection(firestore, 'odeme'),
            where('cardName', '==', cardName),
            where('cardNumber', '==', cardNumber),
            where('cardCVV', '==', cvv),
          );
          const querySnapshot = await getDocs(q);
          const newPayments = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
          setPayments(newPayments);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUcuslar();
      const docRef =  addDoc(collection(db, "Ticket"), {
        userName        : userName,
        userSurName     : userSurName,
        kalkisHavalimani: kalkisHavalimani,
        varisHavalimani : varisHavalimani,
        kalkisSaati     : kalkisSaati,
        varisSaati      : varisSaati,
        tarih           : tarih,
        selectedSeat    : selectedSeat,
        fiyat           : fiyat,
        userid          : userid
    });
    Notifications.scheduleNotificationAsync({
        content: {
          title: 'THY',
          body: 'Biletiniz basarılı bir sekilde olusturulmustur.İyi yolculuklar dileriz.'
        },
        trigger: {
          seconds: 3,
        },
      });
      Alert.alert("Ödeme basarılı.Biletiniz oluşturuldu.");
      navigation.navigate('MyTickets', { selectedSeat, kalkisHavalimani,varisHavalimani,tarih,kalkisSaati,varisSaati,fiyat
        ,userName,userSurName });
  };


  const handleHome = () => {
    navigation.navigate('Main');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.headerText}>Bilet ödeme</Text>
          <View style={styles.detailContainer}>
          <TextInput
          placeholder="Kart Adı"
          value={cardName}
          onChangeText={(text) => setCardName(text)}
        />
          </View>
          <View style={styles.detailContainer}>
          <TextInput
          placeholder="Kart Numarası"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text)}
          keyboardType="numeric"
        />
          </View>
          <View style={styles.detailContainer}>
          <TextInput
          placeholder="CVV"
          value={cvv}
          onChangeText={(text) => setCvv(text)}
          keyboardType="numeric"
        />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handlePayment()} style={styles.Button}>
            <Text style={styles.buttonText}>Bilet Oluştur</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleHome()} style={styles.Button}>
            <Text style={styles.buttonText}>Ana Sayfa</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'darkgrey',
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  Button: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    marginRight:10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MyTickets;
