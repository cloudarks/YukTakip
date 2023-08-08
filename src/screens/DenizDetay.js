import { Dimensions, View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Appearance } from 'react-native'
import React, { useRef, useMemo, useState, useContext, useEffect } from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DataContext } from '../Context/DataContext';
import { Icon } from '@rneui/themed';
import IconP from 'react-native-vector-icons/Feather';
import { FONTS } from '../Assets/Fonts';
import { COLORS } from '../Assets/Colors';


const height = Dimensions.get("screen").height
const colorScheme = Appearance.getColorScheme();

const DenizDetay = ({ navigate }) => {
  const [flag, setFlag] = useState(true);
  const { data } = useContext(DataContext);

  useEffect(() => {
    console.log(colorScheme);
    // console.warn(data.containers[0]);


  }, [])


  const dataFormatter = () => {

    const viewData = {}

    let length = data.containers[0].loadFollowMovement.length

    viewData.lastStatu = data.containers[0].loadFollowMovement[length - 1].statu;
    viewData.lastDate = data.containers[0].loadFollowMovement[length - 1].hareketTarihi;
    viewData.lastLocation = data.containers[0].loadFollowMovement[length - 1].limanLokasyon;

    return viewData;
  }



  // #D1E0DB

  // #64B4CD
  return (

    <SafeAreaView style={{ flex: 1, marginHorizontal: 5, paddingTop: 5, backgroundColor: "white" }}>


      {data.shipNavigationInformation && data.shipNavigationInformation.shipNavigation ?
        <>
          <View style={{ height: height / 3.8, borderWidth: 1, borderRadius: 15, backgroundColor: "#64B4CD", borderColor: "lightgrey", elevation: 5 }}>
            <View style={{ left: 10, top: 8 }}>

              <Text style={{ color: COLORS.white, marginTop: 5, fontFamily: FONTS.Bold, fontSize: 16 }} >Son Durum :               <Text style={{ color: "white" }}>{dataFormatter().lastStatu}</Text></Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', left: 150 }}>
                <Icon color={"white"} size={15} name={'map-marker'} type="material-community" />
                <Text style={styles.text2}> {dataFormatter().lastLocation}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', left: 150 }}>
                <Icon color={"white"} size={15} name={'calendar-month'} type="material-community" />
                <Text style={[styles.text2, { top: 2 }]}> {dataFormatter().lastDate.substring(0, 10)}     </Text>
                <Icon color={"white"} size={15} name={'clock-outline'} type="material-community" />
                <Text style={[styles.text2, { top: 2 }]}> {dataFormatter().lastDate.substring(11)}</Text>
              </View>


              <Text style={{ ...styles.text1, marginTop: 18 }}>Gemi Adı:                      <Text style={styles.text2}>{data.shipNavigationInformation.shipName}</Text></Text>
              <Text style={styles.text1}>Boşaltma Limanı:  <Text style={styles.text2}> {data.shipNavigationInformation.dischargePort}</Text></Text>
              <Text style={styles.text1}>Hat Adı:                           <Text style={styles.text2}>{data.shipNavigationInformation.lineNAme}</Text></Text>
              <Text style={styles.text1}>Sefer Kodu:                  <Text style={styles.text2}>{data.shipNavigationInformation.shipNavigation}</Text></Text>
            </View>

          </View>

          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10, backgroundColor: "grey", marginBottom: 10, borderRadius: 30, marginHorizontal: 5 }}>

            <TouchableOpacity onPress={() => setFlag(!flag)} style={{ backgroundColor: flag ? "#1F41BB" : "grey", borderRadius: 30, paddingHorizontal: 25, paddingTop: 9, paddingBottom: 7 }}>
              <Text style={styles.btntext}>Yük Hareketleri</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setFlag(!flag)} style={{ backgroundColor: flag ? "grey" : "#1F41BB", borderRadius: 30, paddingHorizontal: 30, paddingTop: 9, paddingBottom: 7 }}>
              <Text style={styles.btntext}>containers</Text>
            </TouchableOpacity>

          </View>



          {flag ? data.containers[0].loadFollowMovement.map((info, index) => (

            <View style={{ flexDirection: 'row', paddingBottom: 20, backgroundColor: "white" }} key={index}>
              <View style={{ width: 60, height: '100%', alignItems: 'center' }}>
                <View style={{ borderRadius: 30, paddingVertical: 6, paddingHorizontal: 7, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', marginTop: 18, }}>
                  <Icon size={15} color={'white'} name={'check'} type="font-awesome-5"></Icon>
                </View>
              </View>

              <View>
                <Text style={styles.list.title}>{info.statu}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon size={15} name={'map-marker'} type="material-community" />
                  <Text  > {info.limanLokasyon}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon size={15} name={'calendar-month'} type="material-community" />
                  <Text > {info.hareketTarihi.substring(0, 10)}    </Text>
                  <Icon size={15} name={'clock-outline'} type="material-community" />
                  <Text > {info.hareketTarihi.substring(11)}  </Text>
                </View>

              </View>
            </View>
          )) :
            <ScrollView>
              {
                data.containers.map((item, index) => (

                  <View
                    key={index}
                    style={{ height: 110, flexDirection: 'row', marginBottom: 15 }}>

                    <View>
                      <View style={{ width: 60, height: '100%', alignItems: 'center' }}>
                        <View
                          style={{
                            borderRadius: 30,
                            padding: 10,
                            backgroundColor: 'green',
                            marginTop: 5
                          }}>
                          <IconP name="package" color="white" size={20}></IconP>

                        </View>
                      </View>
                    </View>

                    <View style={{ flex: 1, paddingTop: 2, }}>

                      <Text style={[styles.list.title, { marginBottom: 5, }]}>
                        Konteyner No : {item.konteynerNo}
                      </Text>
                      <Text style={styles.list.text}>
                        Konteyner Boyut Tipi:  {item.konteynerBoyutTip}
                      </Text>
                      <Text style={{ padding: 1,...styles.list.text }}>
                        Gönderici Firma:  {item.gondericiFirma}
                      </Text>
                      <Text style={{ padding: 1, ...styles.list.text }}>
                        Boş Dönüş Tarihi:  {item.bosDonusTarihi}
                      </Text>
                    </View>
                  </View>
                ))
              }

            </ScrollView>

          }

        </>

        :


        <Text style={{ fontSize: 18, left: 40, top: 20 }}>Deniz Detayları Bulunmamaktadır</Text>




      }


    </SafeAreaView>
  )
}

export default DenizDetay;

const styles = StyleSheet.create({

  text1: {
    fontFamily: FONTS.Bold,
    fontSize: 15,
    color: "white",

  },
  text2: {
    fontFamily: FONTS.Medium,
    fontSize: 15,
    color: 'white'

  },

  thintext :{

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


  }
  ,

  btntext: {
    fontFamily: FONTS.Bold,
    fontSize: 19,
    color: "white",
    alignItems: 'center'
  },






})