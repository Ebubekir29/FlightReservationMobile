import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity,Image,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { deleteDoc, getDocs } from 'firebase/firestore';
import { db, collection,doc,} from "../firebase";

const TicketGet = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  useEffect(() => {
    ticketGet();
  }, [])

  const ticketGet = async () => {
    const querySnapshot = await getDocs(collection(db, "Ticket"));
    let tempData = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      tempData.push({ id: doc.id, data: doc.data() });
    });
    setItems(tempData);
  };


  const ticketDelete = async (docId) => {
    Alert.alert(
      "Uyarı",
      "Kullanıcıyı silmek istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Sil",
          onPress: async () => {
            await deleteDoc(doc(db, "Ticket", docId));
            alert("Bilet başarıyla silindi.");
            ticketGet();
          },
        },
      ],
      { cancelable: false }
    );
  };

 const ticketCreate=()=>{
  navigation.navigate('TicketCreate');
 }

  return (
    <><View style={[styles.header,{flexDirection: 'row'}]}>
      <Text style={styles.headerText}>Ticket List</Text>
      <TouchableOpacity onPress={ticketCreate} style={styles.butonEkle}>
      <Text style={{color:'#fff'}}>Oluştur</Text>
      </TouchableOpacity>

    </View>
    <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemView}>
                <View style={styles.itemText}>
                  <Text style={styles.nameText}>Yolcu Adı : {item.data.userName}</Text>
                  <Text style={styles.nameText}>Yolcu Soyadı : {item.data.userSurName}</Text>
                  <Text style={styles.nameText}>Kalkış Havalimanı : {item.data.kalkisHavalimani}</Text>
                  <Text style={styles.nameText}>Varış Havalimanı : {item.data.varisHavalimani}</Text>
                  <Text style={styles.nameText}>Kalkış Tarihi : {item.data.tarih}</Text>
                  <Text style={styles.nameText}>Kalkış Saati : {item.data.kalkisSaati}</Text>
                  <Text style={styles.nameText}>Varış Saati : {item.data.varisSaati}</Text>
                  <Text style={styles.nameText}>Koltuk No : {item.data.selectedSeat}</Text>
                  <Text style={styles.nameText}>Bilet Fiyatı : {item.data.fiyat}</Text>

                </View>
                <View style={{ margin: 10 }}>
                  <TouchableOpacity
                    onPress={()=>{
                      navigation.navigate('TicketEdit',{
                        data:item.data,
                        id:item.id,
                      })
                    }} >
                    <Image
                      source={require('../assets/edit.png')}
                      style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=>{
                      ticketDelete(item.id);
                    }}>
                    <Image                     
                      source={require('../assets/delete.png')}
                      style={[styles.icon, { marginTop: 10 }]} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          } } />
      </View></>
  );
};

export default TicketGet;

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  header: {
    height: 100, 
    width: '100%',
    backgroundColor: '#fff', 
    elevation: 5,
    paddingLeft:10,
    justifyContent:'center',
    paddingTop:30
  },
  headerText:{
    fontSize:18,
    fontWeight:'700',
    width:'70%',
    marginTop:20
  },

  itemText:{
    width:'80%',
    marginLeft:10
  },

  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 20,
    borderRadius: 10,
    height: 300,
    marginBottom: 10,
  },

  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },

  icon:{
    width:24,
    height:24,
  },

  butonEkle:{
    backgroundColor:'#5246f2',
      width:'30%',
      height:40,
      borderRadius:10,
      alignSelf:'flex-end',
      justifyContent:'center',
      alignItems:'center',
      marginRight:10,
      marginBottom:20
  },

})