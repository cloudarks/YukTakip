import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ListItem } from '@rneui/themed';
import IconP from 'react-native-vector-icons/Feather';
import { Icon } from '@rneui/themed';
import { DataContext } from '../Context/DataContext';
import { FONTS } from '../Assets/Fonts';

const Accordions = () => {
    const { data } = useContext(DataContext);
    const [expanded, setExpanded] = useState(Array(data.carInformation.length).fill(false));
    const [konteyners, setKonteyner] = useState([]);


    useEffect(() => {
        if (data.isKonteyner) {
            setKonteyner([data.carInformation.find((arac) => arac.containerBrandNo == data.containerNumber)]);
        }
        else {
            setKonteyner(data.carInformation);
        }
    }, [])


    return (

        <View>

            {konteyners.map((item, index) => (
                <ListItem.Accordion
                    containerStyle={{ padding: 0, height: 82, marginBottom: 30, }}
                    content={
                        <View style={{ height: '100%', width: '80%', flexDirection: 'row', }}>
                            <View>
                                <View style={{ width: 60, height: '100%', alignItems: 'center' }}>
                                    <View
                                        style={{
                                            borderRadius: 30,
                                            padding: 12,
                                            backgroundColor: 'green',
                                            marginTop: 5
                                        }}>
                                        <IconP name="package" color="white" size={20}></IconP>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flex: 1 }}>
                               
                                <View >
                                    <Text style={{ color: "#212122", fontFamily: FONTS.Bold, fontSize: 17, fontWeight: 'bold' }}>
                                        Konteyner No : {item.containerBrandNo}
                                    </Text>
                                </View>
                                <Text
                                    style={{ fontFamily: FONTS.Bold, marginBottom: 2, fontSize: 14, fontWeight: 'bold' }}>
                                    Arac Plaka No: {item.vehiclePlateNo}
                                </Text>
                                <Text
                                    style={{ fontFamily: FONTS.Bold, marginBottom: 2, fontSize: 14, fontWeight: 'bold' }}>
                                    Son Durumu:  {item.vehicleStateInformation.length > 0 ? item.vehicleStateInformation[item.vehicleStateInformation.length - 1].state : "Yok"}
                                </Text>
                                {item.vehicleStateInformation.length > 0 ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon size={15} name={'calendar-month'} type="material-community" />
                                        <Text style={styles.text}> {item.vehicleStateInformation[item.vehicleStateInformation.length - 1].stateDate.substring(0, 10)}  </Text>
                                        <Icon size={15} name={'clock-outline'} type="material-community" />
                                        <Text style={styles.text}> {item.vehicleStateInformation[item.vehicleStateInformation.length - 1].stateDate.substring(11)}  </Text>
                                    </View> :
                                    (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon size={15} name={'calendar-month'} type="material-community" />
                                            <Text style={styles.text}> --                      </Text>
                                            <Icon size={15} name={'clock-outline'} type="material-community" />
                                            <Text style={styles.text}> --  </Text>
                                        </View>

                                    )
                                }

                            </View>
                        </View>

                    }
                    key={index}
                    isExpanded={expanded[index]}
                    onPress={() => {
                        setExpanded(
                            expanded.map((item, arrindex) =>
                                arrindex == index ? (item = !item) : item,
                            ),
                        );
                    }}>
                    <View style={{ left: 43, top: -18 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                left: 15,
                                marginBottom: 5,

                            }}>
                            <Icon size={35} name="truck-fast" type="material-community"></Icon>
                            <Text style={{ left: 8, fontSize: 16, fontWeight: 'bold' }}>
                                {item.vehicleStateInformation.length > 0 ? "Araç Hareketleri" : "Araç Hareketi Bulunmamaktadır"}
                            </Text>
                        </View>

                        {item.vehicleStateInformation.length > 0 && item.vehicleStateInformation.map((info, index) => (
                            <View style={{ height: 60, flexDirection: 'row' }} key={index}>
                                <View style={{ width: 60, height: '100%', alignItems: 'center' }}>
                                    <View
                                        style={{
                                            borderRadius: 30,
                                            paddingVertical: 6,
                                            paddingHorizontal: 7,
                                            backgroundColor: 'green',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 5,
                                        }}>
                                        <Icon
                                            size={15}
                                            color={'white'}
                                            name={'check'}
                                            type="font-awesome-5"></Icon>
                                    </View>

                                </View>

                                <View>


                                    <Text style={{ fontFamily: FONTS.Bold }}>{info.state}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon size={15} name={'calendar-month'} type="material-community" />
                                        <Text style={styles.text}> {info.stateDate.substring(0, 10)}  </Text>
                                        <Icon size={15} name={'clock-outline'} type="material-community" />
                                        <Text style={styles.text}> {info.stateDate.substring(11)}  </Text>
                                    </View>

                                </View>
                            </View>))



                        }
                    </View>
                </ListItem.Accordion>
            ))}
        </View>
    );
};

export default Accordions;

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
    },
});
