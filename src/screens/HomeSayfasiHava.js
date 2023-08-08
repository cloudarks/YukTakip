import { View, Text, StyleSheet, SafeAreaView, Image, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react';
import Icon1 from 'react-native-vector-icons/Fontisto'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon6 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/FontAwesome5'//{setPage("HavaDetay")}
import Icon5 from 'react-native-vector-icons/FontAwesome'
import{ Icon } from '@rneui/themed';
import { DataContext } from '../Context/DataContext';

const HomeSayfasiHava = ({ navigation }) => {

    const [num, setNum] = useState(5)
    const [state, setState] = useState("Havayolu")
    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag3] = useState(false);
    const road = ["HavaDetay", "KaraDetay", "DenizDetay"]
    const [situation, setsituation] = useState(null);
    const [ContainerCode, setContainerCode] = useState("ISB1228884");
    const [page, setPage] = useState(" ")
    const { data } = useContext(DataContext);
    const [kontNum, setKontNum] = useState(0);
    const [hava, setHava] = useState(0);
    const [havaSeferi, setHavaSeferi] = useState('')
    const [kara, setKara] = useState(0);
    const [deniz, setDeniz] = useState('');
    const[ucusHareketSayisi, setUcusHareketSayisi]=useState(0);

    useEffect(() => {
        setKontNum(data.containers.length);
        setKara(data.carInformation.length)
        setDeniz(data.shipNavigationInformation.gemiSeferi)
        setHava(data.airAgents.length)
        setHavaSeferi(data.airAgents.flightNumber)
        setUcusHareketSayisi(data.airAgents.length)
        setContainerCode(data.billOfLadingNo)
        
        console.log('****************************')
        console.log(hava)
        console.log(deniz)
        console.log(havaSeferi)
        console.log(kara)
        
    }, [])
    const checkHava = () => {
        if (ucusHareketSayisi != 0 )
            return <View style={{ alignItems: "center",marginHorizontal:25 }}><TouchableOpacity onPress={() => { navigation.navigate(road) }}>
                <View style={styles.circle2}>
                    <Icon3
                        name="airplane"
                        size={45}
                        color="#082032"
                    />

                </View>
            </TouchableOpacity>
                <Text style={styles.textSt}>Hava Detay </Text>
            </View>
        return null;
    }
    const checkKara = () => {
        if (kara > 0)
            return <View style={{ alignItems: "center" ,marginHorizontal:25}}>
                <TouchableOpacity onPress={() => { navigation.navigate(road) }}>
                    <View style={styles.circle2}>
                        <Icon4
                            name="truck-moving"
                            size={45}
                            color="#082032"
                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.textSt}>Hava Detay</Text>
            </View>;
        return null;
    }
    const checkDeniz = () => {
        if (deniz != null)
            return <View style={{ alignItems: "center" ,marginHorizontal:25}}>
                <TouchableOpacity onPress={() => { navigation.navigate(road) }}>
                    <View style={styles.circle2}>
                        <Icon1
                            name="ship"
                            size={45}
                            color="#082032"

                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.textSt}>Deniz Detay</Text>
            </View>;
        return null;
    }
    const iskonteynerCheck = () => {
        if(kontNum==1){
          return <View>
            <Text>Konteyner No:</Text>
            <Text >{data.containers[0].containerNumber}</Text>
          </View>
        }return null
      }
    const dataFormatter = () => {

        const viewData = {}

        let length = data.airAgents.length

        viewData.lastStatu = data.airAgents[length - 1].status;
        viewData.lastDate = data.airAgents[length - 1].statusTime;
        viewData.message = data.airAgents[length - 1].stateDescription;
        viewData.flightNum = data.airAgents[length - 1].flightNumber;
        viewData.startLoc = data.airAgents[length - 1].startLocation;
        viewData.endLoc = data.airAgents[length - 1].endLocation;

        return viewData;
    }
    const DataInfo = () => {


        if (kontNum > 0)
            return <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20,color:"grey" }}>Konteyner Sayisi:</Text>
                <Text style={{ fontSize: 20 ,color:"grey"}}>   {kontNum}</Text>
            </View>
        else if (kontNum == 0)
            return <View style={{ marginBottom: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 20, color:"grey"}}>Container on the way</Text>
            </View>;
        return null;
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView style={{ flex: 1 }} >
                <View style={{ flexDirection: "row",marginStart: 10 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                        <Icon6
                            name="arrow-back"
                            size={30}
                            color="#082032" />
                    </TouchableOpacity>

                    <View style={{ height: 80, justifyContent: "center", marginStart: 100, marginBottom: -15 }}>
                        <Image source={require("../Assets/arkas_lojisitc.jpg")}
                            style={{ resizeMode: 'contain', height: 130, width: 130 }} />

                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }} >

                    <View style={styles.firstBox}>
                        <View style={{ justifyContent: 'center' }}>
                            <View style={styles.circle}>
                                <Icon3
                                    name="airplane"
                                    size={30}
                                    color="#082032"
                                />
                            </View>

                        </View>
                        <View style={{ justifyContent: "space-evenly" }}>
                            <View >
                                <Text style={styles.textSt}>Son Hareket Bilgileri:</Text>
                                <Text style={styles.textSt}> Flight Number:        {dataFormatter().flightNum}</Text>
                               
                            </View>
                        </View>

                    </View>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <View style={styles.statuBox}>
                        <View style={{ marginBottom: 10, marginTop: 10 }}>

                            <Text style={styles.title}>Statu:</Text>
                            <Text style={styles.textSt}>{dataFormatter().lastStatu}</Text>
                        </View>
                    </View>
                    <View style={styles.statuBox}>
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <Text style={styles.title}>Statu Time:</Text>
              <View style={{ flexDirection: "row" }}>
                <Icon size={15} color="white" name={'calendar-month'} type="material-community" />
                <Text style={styles.textSt}>   {dataFormatter().lastDate.substring(0, 10)}     </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Icon size={15} color="white" name={'clock-outline'} type="material-community" />
                <Text style={styles.textSt}>   {dataFormatter().lastDate.substring(11)}</Text>
              </View>
            </View>
          </View>
                </View>
                <View style={styles.messageBox}>
                    <View style={{ margin: 10, marginTop: 20, marginBottom: 20, }}>
                        <Text style={styles.textSt}>Message:</Text>
                        <Text style={styles.textSt}>{dataFormatter().message}</Text>
                    </View>
                </View>


                <View style={styles.secondBox}>
                <View style={{ margin: 15,marginTop:15, flexDirection: "row" ,justifyContent:"space-between"}}>
              <View style={{flexDirection:"column", justifyContent:"space-evenly"}}>
                <View>
                <Text style={styles.title2}> Konsimento No:</Text>
                <Text style={{ fontFamily: "Gilroy-Medium", color: "black", fontSize: 25, marginTop: 10 }}>{ContainerCode}</Text>
                {iskonteynerCheck()}
                </View>
                <View>{DataInfo()}</View>
                </View>

                  <Image source={require('../Assets/planeGif.gif')}
                    resizeMode='contain'
                    style={{ height: 110, width:180, marginTop:10 }}
                  />

              
            </View>
            <View style={{ flexDirection: "row",justifyContent: 'space-between', marginHorizontal: 20 }}>
              <View style={{width:"60%"}}>
                <Icon2
                  name="location-pin"
                  size={35}
                  color="#0E2954"
                  style={{ marginStart: 30 }}
                />
                <Text style={styles.textSt2}>Çıkış Limanı:</Text>
                <Text style={styles.textSt2}>{dataFormatter().startLoc}</Text>
              </View>
              <View style={{width:"60%"}}>
                <Icon2
                  name="location-pin"
                  size={35}
                  color="#0E2954"
                  style={{ marginStart: 30 }}
                />
                <Text style={styles.textSt2}>Varış Limanı:</Text>
                <Text style={styles.textSt2}>{dataFormatter().endLoc}</Text>
              </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                <View >

                </View>
            </View>
                    <View style={styles.DeepBox}>
                    <View style={{ marginTop: 15, marginStart: 15, }}>
            <Text style={styles.title}> Display Detail Status</Text>
          </View>
          <View style={{ flexDirection: "row" }}>

            <View style={{ flex: 1, marginBottom: 30, }}>
              <View style={{ justifyContent: "center", flexDirection: "row", marginStart: -15 }}>
                <View>{checkHava()}</View>
                <View  >{checkKara()}</View>
                <View>{checkDeniz()}</View>

                <View style={{ alignItems: "center",marginHorizontal:25 }}>
                  <TouchableOpacity onPress={() => { navigation.navigate() }}>
                    <View style={styles.circle2}>
                      <Image source={require("../Assets/container.png")}
                        style={{ resizeMode: 'center', width: 65, height: 65, tintColor: "#082032", marginStart: 5 }}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.textSt}>Hepsi</Text>
                </View>
              </View>
            </View>
          </View>

                       

                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default HomeSayfasiHava
const styles = StyleSheet.create({
    firstBox: {
        backgroundColor: "#0E2954",
        borderRadius: 40,
        margin: 1,
        flexDirection: "row",
        flex: 1
    },
    line: {
        height: 4,
        width: 35,
        backgroundColor: "#082032"
    },
    circle: {
        width: 60,
        height: 60,
        margin: 5,
        borderRadius: 100 / 2,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    circle2: {
        width: 75,
        height: 75,
        margin: 5,
        borderRadius: 100 / 2,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: "#0E2954",

    },
    secondBox: {

        borderTopRightRadius: 70,
        borderTopLeftRadius:70,
        marginTop: 5,
        
        borderColor: "#0E2954",
    borderWidth:4,
        flex: 1
    },
    messageBox: {

        borderRadius: 20,
        backgroundColor: "#5A96E3",
        marginTop: 5,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 23,
        color: "white",
        fontFamily: "Gilroy-MediumItalic"
    },
    title2: {
        fontSize: 23,
        color: "black",
        fontFamily: "Gilroy-BoldItalic"
      },
    textSt: {
        fontSize: 15,
        color: "white",
        fontFamily: "NexaRegular"
    },
    textSt2: {
        fontSize: 17,
        color: "black",
        fontFamily: "NexaBold",
    
      },

    inbox: {
        marginBottom: 15,
        marginHorizontal: 20,
        borderRadius: 30,
        height: 125,
        alignItems: "center"
    },
    DeepBox: {
        backgroundColor: "#5A96E3",
        height: "110%",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        marginTop: 10,

    },
    inbox2: {
        marginBottom: 15,
        marginHorizontal: 20,
        backgroundColor: "#5A96E3",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "white",
        flex: 1,
    },
    statuBox: {
        marginTop: 5,
        backgroundColor: "#0E2954",
        borderRadius: 40,
        margin: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

