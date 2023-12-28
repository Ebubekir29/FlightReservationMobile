import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { QuerySnapshot, deleteDoc, getDocs } from 'firebase/firestore';
import { db, collection, addDoc, getFirestore, app, auth, getDoc, doc, setDoc, getUser, uploadFile, ref, storage, getDownloadURL } from "../firebase";
import style from 'react-native-modal-picker/style';

const RouteGet = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  useEffect(() => {
    routeGet();
  }, [])

  const routeGet = async () => {
    const querySnapshot = await getDocs(collection(db, "Route"));
    let tempData = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      tempData.push({ id: doc.id, data: doc.data() });
    });
    setItems(tempData);
  };


 const routeDelete=async(docId)=>{
  await deleteDoc(doc(db,"Route",docId));
  alert("Rota başarıyla silindi.");
  routeGet();
 };

 const routeCreate=()=>{
  navigation.navigate('RouteCreate');
 }

  return (
    <><View style={[styles.header,{flexDirection: 'row'}]}>
      <Text style={styles.headerText}>Route List</Text>
      <TouchableOpacity onPress={routeCreate} style={styles.butonEkle}>
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
                  <Text style={styles.nameText}>Kalkış Havalimanı : {item.data.havalimaniKalkis}</Text>
                  <Text style={styles.nameText}>Varış Havalimanı : {item.data.havalimaniVaris}</Text>
                  <Text style={styles.nameText}>Kalkış Şehri : {item.data.sehirKalkis}</Text>
                  <Text style={styles.nameText}>Varış Şehri : {item.data.sehirVaris}</Text>
                  <Text style={styles.nameText}>Uçak Modeli : {item.data.ucakModel}</Text>
                  <Text style={styles.nameText}>Kalkış Tarihi : {item.data.tarihKalkis}</Text>
                  <Text style={styles.nameText}>Kalkış Saati : {item.data.saatKalkis}</Text>
                  <Text style={styles.nameText}>Varış Saati : {item.data.saatVaris}</Text>
                  <Text style={styles.nameText}>Bilet Fiyatı : {item.data.biletFiyat}</Text>
                </View>
                <View style={{ margin: 10 }}>
                  <TouchableOpacity
                    onPress={()=>{
                      navigation.navigate('RouteEdit',{
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
                      routeDelete(item.id);
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

export default RouteGet;

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
    height: 250,
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