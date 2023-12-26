import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { db, doc, setDoc,addDoc } from "../firebase";
import style from 'react-native-modal-picker/style';


const TicketCreate = () => {
  const [havalimaniKalkis, sethavalimaniKalkis] = useState('');
  const [havalimaniVaris, sethavalimaniVaris] = useState('');
  const [sehirKalkis, setsehirKalkis] = useState('');
  const [sehirVaris, setsehirVaris] = useState('');
  const [ucakModel, setucakModel] = useState('');
  const [tarihKalkis, settarihKalkis] = useState('');
  const [saatKalkis, setsaatKalkis] = useState('');
  const [saatVaris, setsaatVaris] = useState('');
  const [biletFiyat, setbiletFiyat] = useState(0);
  const [yolcuAdi, setyolcuAdi] = useState('');
  const [yolcuSoyadi, setyolcuSoyadi] = useState('');
  const [kullaniciId, setkullaniciId] = useState('');
  const [koltukNo, setkoltukNo] = useState('');

  const navigation = useNavigation();

  const ticketCreate = async () => {
    try {
      const docRef = await addDoc(collection(db, "Ticket"), {
        havalimaniKalkis: havalimaniKalkis,
        havalimaniVaris: havalimaniVaris,
        sehirKalkis: sehirKalkis,
        sehirVaris: sehirVaris,
        ucakModel: ucakModel,
        tarihKalkis: tarihKalkis,
        saatKalkis: saatKalkis,
        saatVaris: saatVaris,
        biletFiyat: biletFiyat,
        yolcuAdi: yolcuAdi,
        yolcuSoyadi: yolcuSoyadi,
        kullaniciId: kullaniciId,
        koltukNo: koltukNo
      });
      console.log('Ticket added!');
    } catch (e) {
      console.error("Error adding document", e);
    }
  }



  return (

    //tarih işlemini düzelt 

    <>

      <View style={styles.header}>
        <Text style={styles.headerText}>Ticket Create</Text>
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
          <TextInput onChangeText={(text) => setyolcuAdi(text)} placeholder='Yolcu Adı' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setyolcuSoyadi(text)} placeholder='Yolcu Soyadı' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setkoltukNo(text)} placeholder='Koltuk No' style={styles.inputStyle} />
          <TextInput onChangeText={(text) => setkullaniciId(text)} placeholder='Kullanıcı Id' style={styles.inputStyle} />

          <TouchableOpacity onPress={ticketCreate} style={styles.butonYukle}>
            <Text style={{ color: '#fff' }}>Bilet'i Ekle</Text>
          </TouchableOpacity>
        </View>

      </ScrollView></>
  );
};

export default TicketCreate;

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
    alignItems: 'center',
    marginBottom:5
  }


});