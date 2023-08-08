/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image, Alert, Pressable
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAccesToken, getKonsimentoData, getKonteynerData } from '../Service/ApiService';
import { DataContext } from '../Context/DataContext';
import ToastManager, { Toast } from 'toastify-react-native'
import { FONTS } from '../Assets/Fonts';
import { doCheckDigit } from '../Utils/Helpers';
import { ActivityIndicator, Button, Modal, Portal } from 'react-native-paper';
import { Icon } from '@rneui/base';
import { COLOR } from '../Assets/Colors';

const LoginPage = ({ navigation }) => {

  const [number, onChangeNumber] = React.useState('');
  const [token, setToken] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [visible, setVisible] = React.useState(true);
  const hideModal = () => setVisible(false);


  const { setData } = useContext(DataContext);


  useEffect(() => {

    getToken();

  }, [])

  const getToken = async () => {
    try {
      let newToken = await getAccesToken();
      setToken(newToken)

    } catch (error) {
      Toast.error(error.message)
    }
  }

  // 476889 && 35-7232 9740     //  kayıt yok  entity=[]
  // 463337 && 235-7233 2256    // only hava -- container yok bunda
  // let num = "235-7232 9762"  clienID=4511   // only hava   -- container yok bunda
  // let num = "ISB1228884"   clienID=9116     // kara deniz
  // let number="235-0029 5304" clientID=24967  //hava sadece

  const onPress = async () => {
    let number = "ISB1228884"
    sendRequest(number);
  };


  const sendRequest = async (number) => {

    let isKonteyner = false;
    let data;
    if (token) {
      setLoading(true);

      try {

        if (doCheckDigit(number)) {
          isKonteyner = true;
          data = await getKonteynerData(number, token)
          if (data.errorMessages.length > 0) { Toast.error(data.errorMessages); setLoading(false); return }
        }
        else {
          console.log("------------")
          data = await getKonsimentoData(number, token)
          if (data.errorMessages.length > 0) { Toast.error(data.errorMessages); setLoading(false); return }

        }

      }
      catch (error) {

        console.log(error);

        if (error.response.status == 401 || error.response.status == 403) {  // token expires
          let newToken = await getAccesToken();
          if (doCheckDigit(number)) {
            isKonteyner = true;
            data = await getKonteynerData(number, token)
            if (data.errorMessages.lenght > 0) { Toast.error(data.errorMessages); setLoading(false); return }

          }
          else {
            data = await getKonsimentoData(number, token)
            if (data.errorMessages.lenght > 0) { Toast.error(data.errorMessages); setLoading(false); return }

          }
          setToken(newToken)
        }
        else {  // internal server errors  
          setLoading(false)
          Toast.error(error.message);
          return;
        }

      }
      setLoading(false);
      console.log(data.entity[0]);
      setData({ ...data.entity[0], isKonteyner: isKonteyner, containerNumber: number });
      //navigation.navigate('HomeSayfasiKara')

    }
    else {
      getToken();
    }

  }

  return (
    <SafeAreaView style={styles.container}>

      <ToastManager duration={5000} width={300} height={95} />

      <View style={styles.cart}>
        <View style={styles.header}>
          <Image
            style={{ alignSelf: 'center', height: 60, marginTop: 30, width: 200 }}
            resizeMode="contain"
            source={require('../../assets/img/arkas.png')}>

          </Image>

        </View>

        <View style={styles.body}>

          <Text style={{ marginHorizontal: 20, textAlign: 'center', fontFamily: FONTS.Medium, fontSize: 15, bottom: 10 }}>Please enter the container number or waybill number</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Enter the code"

          />
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={{ color: 'white', fontFamily: FONTS.Bold, fontSize: 20 }}>
              Submit
            </Text>
            {
              loading && <ActivityIndicator style={{ paddingBottom: 5, left: 10, }} hidesWhenStopped={true} animating={loading} size={20} color="white" />
            }
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E88E5',
  },

  cart: {
    width: '90%',
    height: 370,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    elevation: 5

  },
  header: {
    height: '25%',
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: 'white',


  },
  info: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },

  input: {
    backgroundColor: "hsl(210,8%,95%)",
    borderColor: "grey",
    fontSize: 16,
    borderWidth: 1,
    width: '70%',
    padding: 10,
    textAlign: 'center',
    borderRadius: 30,
    marginBottom: 30,
    marginTop: 15
  },
  button: {
    flexDirection: 'row',
    textAlign: 'center',
    // marginTop: 20,
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical:6,
    // paddingTop:8,
    // paddingHorizontal:8,
    borderRadius: 30,
    borderWidth: 0.6,
    borderColor: "grey",
    backgroundColor: 'green',
    paddingBottom: 5,
    paddingTop: 8,
    paddingRight: 18,
    paddingLeft: 19,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: 300,
    height: 200,
    backgroundColor: "white"
  },


});

export default LoginPage;
