import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity,Image,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { deleteDoc, getDocs } from 'firebase/firestore';
import { db, collection, doc} from "../firebase";

const UserGet = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  useEffect(() => {
    userGet();
  }, [])

  const userGet = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let tempData = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      tempData.push({ id: doc.id, data: doc.data() });
    });
    setItems(tempData);
  };


  const userDelete = async (docId) => {
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
            await deleteDoc(doc(db, "users", docId));
            alert("Kullanıcı başarıyla silindi.");
            userGet();
          },
        },
      ],
      { cancelable: false }
    );
  };

 const userCreate=()=>{
  navigation.navigate('UserCreate');
 }

  return (
    <><View style={[styles.header,{flexDirection: 'row'}]}>
      <Text style={styles.headerText}>User List</Text>
      <TouchableOpacity onPress={userCreate} style={styles.butonEkle}>
      <Text style={{color:'#fff'}}>Oluştur</Text>
      </TouchableOpacity>

    </View>
    <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item}) => {
            return (
              <View style={styles.itemView}>
                <View style={styles.itemText}>
                  <Text style={styles.nameText}>Adı : {item.data.userName}</Text>
                  <Text style={styles.nameText}>Soyadı : {item.data.userSurName}</Text>
                  <Text style={styles.nameText}>Email : {item.data.userEmail}</Text>
                  <Text style={styles.nameText}>Telefon : {item.data.userPhone}</Text>
                  <Text style={styles.nameText}>TcNo : {item.data.userTcNo}</Text>
                  <Text style={styles.nameText}>Password : {item.data.userSifre}</Text>
                  <Text style={styles.nameText}>Role : {item.data.role}</Text>
                </View>
                <View style={{ margin: 10 }}>
                  <TouchableOpacity
                    onPress={()=>{
                      navigation.navigate('UserEdit',{
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
                      userDelete(item.id);
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

export default UserGet;

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