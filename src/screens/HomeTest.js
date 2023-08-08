import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Button } from 'react-native-paper'
import { DataContext } from '../Context/DataContext'

const HomeTest = ({navigation}) => {

  const {data } = useContext(DataContext);

  useEffect(() => {

    console.log(data);
  
  }, [])
  




  return (
    <View  style={{justifyContent:'space-between',alignItems:'center',height:150,top:10}}>
        <Button buttonColor='green' style={{width:100}} textColor='white' onPress={()=>navigation.navigate('KaraDetay')}>Kara</Button>    
        <Button buttonColor='green'  style={{width:100}}  textColor='white' onPress={()=>navigation.navigate('DenizDetay')} >Deniz</Button>  
        <Button buttonColor='green'  style={{width:100}}  textColor='white' onPress={()=>navigation.navigate('HavaDetay')} >Hava</Button>  
    </View>
  )
}

export default HomeTest