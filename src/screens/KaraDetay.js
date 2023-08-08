import { Dimensions, View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Accordions from '../components/Accordions';
import { DataContext } from '../Context/DataContext';
import { FONTS } from '../Assets/Fonts';

const heightscreen = Dimensions.get("screen").height


const KaraDetay = ({ navigate }) => {
  const [expanded, setExpanded] = useState([false, false])
  const { data } = useContext(DataContext);

  useEffect(() => {
    // console.log(data);

  }, [])




  return (
      <SafeAreaView style={{ flex: 1, paddingTop: 5, paddingLeft: 6, backgroundColor: "white" }}>

        {data.carInformation && data.carInformation.length>0 ?

          <>
            <View style={{ backgroundColor: "white" }}>
              <Text style={{color:"#212122",fontSize:20, top: 8, left: 10,  fontFamily:FONTS.Bold  }}>Konteyner Listesi</Text>
            </View>

            <ScrollView style={{ marginTop: 20 }}>
              <Accordions></Accordions>
            </ScrollView>
          </>
          :
          <Text style={{ alignSelf: 'center', fontSize: 19, top: 30 }}>Kara Detayları Bulunmamaktadır</Text>

        }


      </SafeAreaView>
  )
}

export default KaraDetay

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: 'orange',
    opacity: 0.6,
  },

  cont1: {
    height: 280,
    backgroundColor: "white"
  },

  cont1header: {
    height: 60,
    backgroundColor: "#ffffff"

  },
  cont1body: {
    height: 250,
    borderRadius: 30,
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 45,

    backgroundColor: "#3a0ca3",
    elevation: 5,
    paddingBottom: 8


  },

  cont2: {
    overflow: 'hidden',

    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    flex: 1

  },

  cont2header: {
    paddingTop: 10,
    flexDirection: 'row',
    height: "12%",
    justifyContent: 'space-between'

  },

  cont2body: {
    flex: 1,
    paddingHorizontal: 5

  },

  bodyCard: {
    height: 90,
    flexDirection: 'row'

  },
  contentContainer: {
    flex: 1,
    borderRadius: 30
  },




})