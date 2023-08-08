import { View, Text, StyleSheet, SafeAreaView, Image, useWindowDimensions, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react';
import Icon1 from 'react-native-vector-icons/Fontisto'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon6 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/FontAwesome5'
import { DataContext } from '../Context/DataContext';
import { Screen } from 'react-native-screens';
import { Icon } from '@rneui/themed';

const HomeSayfasiKara = ({ navigation }) => {

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
    const [aracSayi, setAracSayi] = useState(0);
    const [ucusHareketSayisi, setUcusHareketSayisi] = useState(0);

    useEffect(() => {
        setKontNum(data.containers.length);
        setKara(data.carInformation.length)
        setDeniz(data.shipNavigationInformation.shipNavigation)
        setHava(data.airAgents.length)
        setHavaSeferi(data.airAgents.flightNumber)
        setAracSayi(data.carInformation.length)
        setUcusHareketSayisi(data.airAgents.length)
        setContainerCode(data.billOfLadingNo)


        console.log('****************************')
        console.log(hava)
        console.log(deniz)
        console.log(havaSeferi)
        console.log(kara)


    }, [])

    const checkHava = () => {
        if (ucusHareketSayisi != 0)
            return <View style={{ alignItems: "center", }}><TouchableOpacity onPress={() => { navigation.navigate('HavaDetay') }}>
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
            return <View style={{ alignItems: "center", }}>
                <TouchableOpacity onPress={() => { navigation.navigate('KaraDetay') }}>
                    <View style={styles.circle2}>
                        <Icon4
                            name="truck-moving"
                            size={45}
                            color="#082032"
                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.textSt}>Kara Detay</Text>
            </View>;
        return null;
    }
    const checkDeniz = () => {
        if (deniz != null)
            return <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={() => {  navigation.navigate('DenizDetay')  }}>
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
    const konteynerCarInfo = (i) => {
        let plaka = i.vehiclePlateNo;
        let belgeNo = i.waybillDocumentNo;
        let belgeTarih = i.waybillDate;
        let kontMarka = i.containerBrandNo;

        return<View style={{ borderWidth: 2, borderRadius: 40, margin: 4, justifyContent: "center", }}>
        <View style={{ flexDirection: "row" }}>
            <Image source={require("../Assets/TruckIcon.png")}
                style={{ resizeMode: 'center', width: 85, height: 85, tintColor: "#082032", marginStart: 5 }}
            />
            <View style={{}}>
                <Text>Plaka:</Text>
                <Text>İrsaliye Belge No:</Text>
                <Text>İrsaliye Tarihi:</Text>
                <Text>Konteyner No:</Text>

            </View>
            <View style={{ marginLeft: 13 }}>
                <Text>{plaka}</Text>
                <Text>{belgeNo}</Text>
                <View style={{ flexDirection: "row" }}>

                    <Text >{belgeTarih.substring(0, 10)} -- </Text>

                    <Text >{belgeTarih.substring(11)}</Text>
                </View>
                <Text>{kontMarka}</Text>

            </View>
        </View>


    </View>;
    }
    const dataFormatter = (i) => {

        let plaka = data.carInformation[i].vehiclePlateNo;
        let belgeNo = data.carInformation[i].waybillDocumentNo;
        let belgeTarih = data.carInformation[i].waybillDate;
        let kontMarka = data.carInformation[i].containerBrandNo;

        return <View style={{ borderWidth: 2, borderRadius: 40, margin: 4, justifyContent: "center", }}>
            <View style={{ flexDirection: "row" }}>
                <Image source={require("../Assets/TruckIcon.png")}
                    style={{ resizeMode: 'center', width: 85, height: 85, tintColor: "#082032", marginStart: 5 }}
                />
                <View style={{}}>
                    <Text>Plaka:</Text>
                    <Text>İrsaliye Belge No:</Text>
                    <Text>İrsaliye Tarihi:</Text>
                    <Text>Konteyner No:</Text>

                </View>
                <View style={{ marginLeft: 13 }}>
                    <Text>{plaka}</Text>
                    <Text>{belgeNo}</Text>
                    <View style={{ flexDirection: "row" }}>

                        <Text >{belgeTarih.substring(0, 10)} -- </Text>

                        <Text >{belgeTarih.substring(11)}</Text>
                    </View>
                    <Text>{kontMarka}</Text>

                </View>
            </View>


        </View>;
    }
    const iskonteynerCheck = () => {
        if (kontNum == 1) {
            return <View>
                <Text>Konteyner No:</Text>
                <Text >{data.containers[0].containerNumber}</Text>
            </View>
        } return null
    }
    const DataInfo = () => {


        if (kontNum > 0)
            return <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20 }}>Konteyner Sayisi:</Text>
                <Text style={{ fontSize: 20 }}>   {kontNum}</Text>
            </View>
        else if (kontNum == 0)
            return <View style={{ marginBottom: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 20 }}>Container on the way</Text>
            </View>;
        return null;

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, flexDirection: 'column', }} >

                <View style={{ flexDirection: "row", marginTop: 10, marginStart: 10 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                        <Icon6
                            name="arrow-back"
                            size={30}
                            color="#082032" />
                    </TouchableOpacity>

                    <View style={{ height: 80, justifyContent: "center", marginStart: 80, marginBottom: -10 }}>
                        <Image source={require("../Assets/arkas_lojisitc.jpg")}
                            style={{ resizeMode: 'contain', height: 150, width: 150 }} />

                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }} >

                    <View style={styles.firstBox}>
                        <View style={{ justifyContent: 'center' }}>
                            <View style={styles.circle}>
                                <Icon4
                                    name="truck-moving"
                                    size={35}
                                    color="#082032"
                                />
                            </View>

                        </View>
                        <View style={{ justifyContent: "center" }}>
                            <View style={{ alignItems: "center", }}>
                                <Text style={styles.textSt}>  Araç Sayisi:</Text>
                                {kontNum==1 ? <Text style={styles.textSt}>1</Text>:<Text style={styles.textSt}>{aracSayi}</Text>}
                                
                            </View>
                        </View>

                    </View>
                    <View style={styles.firstBox}>
                        <View style={{ justifyContent: 'center' }}>
                            <View style={styles.circle}>
                                <Image source={require("../Assets/container.png")}
                                    style={{ resizeMode: 'contain', width: 55, height: 55, tintColor: "#082032", marginStart: 5 }}
                                />
                            </View>

                        </View>
                        <View style={{ justifyContent: "center" }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.textSt}>Konteyner Sayisi:</Text>
                                <Text style={styles.textSt}>{kontNum}</Text>
                            </View>
                        </View>

                    </View>

                </View>

                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <View style={styles.secondBox}>

                        <ScrollView style={{ flex: 1, marginBottom: 12, marginTop: 5 }}>
                            <View style={{ margin: 10, justifyContent: "space-between" }}>

                                <View>
                                    <Text style={styles.title2}> Konsimento No:</Text>
                                    <Text style={{ fontFamily: "Gilroy-Medium", color: "black", fontSize: 25, }}>{ContainerCode}</Text>
                                    {iskonteynerCheck()}
                                </View>

                            </View>
                            {kontNum == 1 ? <View>{
                                konteynerCarInfo(data.carInformation.find((item) => item.containerBrandNo== data.containers[0].containerNumber))
                                }</View> : <View>{data.carInformation.map((item, i) => (
                                    dataFormatter(i)
                                ))}</View>}


                        </ScrollView>
                    </View>



                    <View style={styles.DeepBox}>
                        <View style={{ marginTop: 15, marginStart: 15, }}>
                            <Text style={styles.title}> Display Detail Status</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>

                            <View style={{ flex: 1, marginBottom: 30 }}>
                                <View style={{ justifyContent: "space-evenly", flexDirection: "row", margin: 5, }}>
                                    <View>{checkHava()}</View>
                                    <View  >{checkKara()}</View>
                                    <View>{checkDeniz()}</View>

                                    <View style={{ alignItems: "center", }}>
                                        <TouchableOpacity onPress={() => { navigation.navigate() }}>
                                            <View style={styles.circle2}>
                                                <Image source={require("../Assets/container.png")}
                                                    style={{ resizeMode: 'center', width: 65, height: 65, tintColor: "#082032" }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={styles.textSt}>Hepsiiii</Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                    </View>
                </View>
            </View>


        </SafeAreaView>
    )
}
export default HomeSayfasiKara
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

        borderRadius: 30,
        marginTop: 5,
        marginHorizontal: 5,
        borderColor: "#0E2954",
        borderWidth: 3,
        flex: 1,
        marginBottom: 10
    },
    messageBox: {

        borderRadius: 20,
        backgroundColor: "#5A96E3",
        marginTop: 10,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 25,
        color: "white",
        fontFamily: "Gilroy-MediumItalic"
    },
    title2: {
        fontSize: 25,
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
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,

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
        marginTop: 10,
        backgroundColor: "#0E2954",
        borderRadius: 40,
        margin: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

