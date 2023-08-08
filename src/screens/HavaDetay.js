import { Dimensions, View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useMemo, useState, useContext, useEffect } from 'react'
import { DataContext } from '../Context/DataContext';
import { Icon } from '@rneui/themed';
import { FONTS } from '../Assets/Fonts';

const height = Dimensions.get("screen").height


const HavaDetay = ({ navigate }) => {
  const [expanded, setExpanded] = useState(false)
  const sheetRef = useRef(null);
  const [flag, setFlag] = useState(true);


  const { data } = useContext(DataContext);

  useEffect(() => {
    // console.log(data);
    // console.warn(data.konteynerlar[0]);


  }, [])


  const dataFormatter = () => {

    const viewData = {}

    let length = data.airAgents.length

    viewData.laststatus = data.airAgents[length - 1].status;
    viewData.lastDate = data.airAgents[length - 1].statusTime;

    return viewData;
  }



  // #D1E0DB

  // #64B4CD
  return (

    <SafeAreaView style={{ flex: 1, paddingTop: 5, backgroundColor: "white" }}>


      {data.airAgents.length > 0 && data.airAgents[0].flightNumber ?

        <>
          <View style={{ height: height / 3.5, borderWidth: 1, borderColor: "lightgrey", marginHorizontal: 8, elevation: 5, borderRadius: 15, backgroundColor: "#64B4CD" }}>

            <View style={{ left: 10, top: 8 }}>
              <Text style={{ fontFamily: "GalanoGrotesque-Bold", marginTop: 5, fontSize: 22, color: "white" }}>Hava Sefer Bilgileri</Text>
              <Text style={[styles.text1, { color: "white", marginTop: 13, fontSize: 16 }]} >Son Durum:              {dataFormatter().laststatus}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', left: 140 }}>
                <Icon color={"white"} size={15} name={'calendar-month'} type="material-community" />
                <Text style={{ ...styles.text2, top: 2 }}> {dataFormatter().lastDate.substring(0, 10)}    </Text>
                <Icon color={"white"} size={15} name={'clock-outline'} type="material-community" />
                <Text style={{ ...styles.text2, top: 2 }}> {dataFormatter().lastDate.substring(11)}</Text>
              </View>

              <Text style={{ ...styles.text1, marginTop: 5, paddingBottom: 5 }}>Uçuş Numarası:         <Text style={styles.text2} >{data.airAgents[0].flightNumber}</Text></Text>
              <Text style={styles.text1}>Konşimento No:          <Text style={styles.text2}>{data.airAgents[0].billOfLadingNo}</Text></Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Icon color={"white"} size={15} name={'crosshairs-gps'} type="material-community" />
                <Text style={{ ...styles.text2, top: 2 }}> {data.airAgents.length > 0 ? data.airAgents[0].startLocation : " --"}    </Text>
              </View>
              <View style={{height:13,width:20,alignItems:'center',justifyContent:'center'}} >
                  <View style={{right:2.5,borderWidth:1,height:"90%",width:2,borderColor:"white"}}></View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Icon color={"white"} size={15} name={'map-marker'} type="material-community" />
                <Text style={{ ...styles.text2, top: 2 }}> {data.airAgents.length > 0 ? data.airAgents[0].endLocation : " --"}</Text>
              </View>
            </View>

          </View>

          <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 10, borderRadius: 10, marginLeft: 15 }}>
            <Text style={{ fontFamily: FONTS.ExtraBold, fontSize: 22 }}>Yük Hareketleri</Text>
          </View>

          <ScrollView>

            {data.airAgents.map((info, index) => (

              <View style={{ flexDirection: 'row', paddingBottom: 20, backgroundColor: "white", }} key={index}>

                <View style={{ width: 60, height: '100%', alignItems: 'center' }}>
                  <View
                    style={{
                      borderRadius: 30,
                      paddingVertical: 6,
                      paddingHorizontal: 7,
                      backgroundColor: 'green',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    <Icon size={15} color={'white'} name={'check'} type="font-awesome-5"></Icon>
                  </View>

                </View>

                <View >
                  <Text style={styles.list.title}>{info.status}</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={15} name={'calendar-month'} type="material-community" />
                    <Text style={styles.list.text}> {info.statusTime.substring(0, 10)}    </Text>
                    <Icon size={15} name={'clock-outline'} type="material-community" />
                    <Text style={styles.list.text}> {info.statusTime.substring(11)}  </Text>
                  </View>
                  <Text style={{ width: 345, fontStyle: 'italic' }}>{info.stateDescription.replace("\n", "  ")}</Text>
                </View>

              </View>
            ))
            }
          </ScrollView>



        </>

        :
        <Text style={{ alignSelf: 'center', fontSize: 19, top: 30 }}>Hava Detayları Bulunmamaktadır</Text>

      }





    </SafeAreaView>


  )
}

export default HavaDetay;

const styles = StyleSheet.create({

  text1: {
    fontFamily: FONTS.Bold,
    fontSize: 14,
    color: "white",

  },
  text2: {
    fontFamily: FONTS.Medium,
    fontSize: 15,
    color: 'white'

  },

  thintext: {

  }
  ,
  list: {
    title: {
      fontFamily: FONTS.Bold,
      fontSize: 16,
      color: "#212122",
    },
    text: {
      fontFamily: "Gilroy-Bold",
      fontSize: 15,
    }

  },
  title: {
    paddingLeft: 10,
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 22,
    paddingBottom: 15
  },

  btntext: {
    fontSize: 22,
    fontFamily: "GalanoGrotesque-Bold",
  },






})