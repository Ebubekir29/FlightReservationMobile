import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';
import { db } from "../firebase";
import { getFirestore, collection, addDoc, doc, getDoc,query,where,getDocs,updateDoc,increment } from 'firebase/firestore';
import { getUserSession } from './userService';
const Tickets = ({ route }) => {
  const [userid, setid] = useState(null);
  const [items, setItems] = useState([]);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  useEffect(() => {
    ticketGet();
  }, [])
  
  const ticketGet = async () => {
    const q = query(collection(db, "Ticket"), where("userid", "==", await getUserSession()));
    const querySnapshot = await getDocs(q);
    const productList = querySnapshot.docs.map(doc => doc.data());
    let tempData = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      tempData.push({ id: doc.id, data: doc.data() });
    });
    setItems(tempData);
  };
  return (
    <><View>
    </View>
    <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item}) => {
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
                </View>
              </View>
            );
          } } />
      </View></>
  );
};

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
      marginTop: 40,
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

export default Tickets;


