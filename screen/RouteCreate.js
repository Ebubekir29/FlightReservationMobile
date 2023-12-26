import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { db,addDoc,collection, doc, setDoc } from "../firebase";
import style from 'react-native-modal-picker/style';


const RouteCreate = () => {
  const [havalimaniKalkis, sethavalimaniKalkis] = useState('');
  const [havalimaniVaris, sethavalimaniVaris] = useState('');
  const [sehirKalkis, setsehirKalkis] = useState('');
  const [sehirVaris, setsehirVaris] = useState('');
  const [ucakModel, setucakModel] = useState('');
  const [tarihKalkis, settarihKalkis] = useState('');
  const [saatKalkis, setsaatKalkis] = useState('');
  const [saatVaris, setsaatVaris] = useState('');
  const [biletFiyat, setbiletFiyat] = useState(0);


  const navigation = useNavigation();


  const routeCreate = async() => {
    try{
      const docRef = await addDoc(collection(db,"Route"),{
        havalimaniKalkis: havalimaniKalkis,
        havalimaniVaris: havalimaniVaris,
        sehirKalkis: sehirKalkis,
        sehirVaris: sehirVaris,
        ucakModel: ucakModel,
        tarihKalkis: tarihKalkis,
        saatKalkis: saatKalkis,
        saatVaris: saatVaris,
        biletFiyat: biletFiyat
      });
      console.log('Route added!');
      alert("Rota başarıyla oluşturuldu.");
      navigation.navigate('RouteGet');
    }catch(e){
      console.error("Error adding document",e);
      alert("Rota oluşturulamadı , tekrar deneyiniz.");

  }  
    

  }

  return (
    
    //tarih işlemini düzelt 
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Route Create</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.container}>

          <TextInput onChangeText={(text) => sethavalimaniKalkis(text)} placeholder='Kalkış Havalimanı' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => sethavalimaniVaris(text)} placeholder='Varış Havalimanı' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setsehirKalkis(text)} placeholder='Kalkış Şehri' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setsehirVaris(text)} placeholder='Varış Şehri' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setucakModel(text)} placeholder='Uçak Modeli' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => settarihKalkis(text)} placeholder='Kalkış Tarihi' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setsaatKalkis(text)} placeholder='Kalkış Saati' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setsaatVaris(text)} placeholder='Varış Saati' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setbiletFiyat(text)} placeholder='Bilet Fiyatı' style={styles.inputStyle} />
          <TouchableOpacity onPress={routeCreate} style={styles.butonYukle}>
            <Text style={{ color: '#fff' }}>Rota'yı Ekle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default RouteCreate;

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