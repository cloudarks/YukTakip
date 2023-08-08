import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/screens/LoginPage';
import { Provider as PaperProvider } from 'react-native-paper';
import { DataContextProvider } from './src/Context/DataContext';
import KaraDetay from './src/screens/KaraDetay';
import DenizDetay from './src/screens/DenizDetay';
import HavaDetay from './src/screens/HavaDetay';
import HomeTest from './src/screens/HomeTest';
// import HomeSayfasiKara from './src/screens/HomeSayfasiKara';

const Stack = createStackNavigator();


const App = () => {
  return (
    <DataContextProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator   >

            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
            <Stack.Screen options={{ headerTitle: "Home Sayfası" }} name="HomeTest" component={HomeTest} />
            {/* <Stack.Screen options={{ headerTitle: "Kara Detay Sayfası" }} name="KaraDetay" component={KaraDetay} /> */}
            {/* <Stack.Screen options={{ headerTitle: "Deniz Detay Sayfası" }} name="DenizDetay" component={DenizDetay} /> */}
            {/* <Stack.Screen options={{ headerTitle: "Hava Detay Sayfası" }} name="HavaDetay" component={HavaDetay} /> */}
            {/* <Stack.Screen options={{ headerTitle: "Home Sayfası" }} name="HomeSayfasiKara" component={HomeSayfasiKara} /> */}

          </Stack.Navigator>

        </NavigationContainer>
      </PaperProvider>
    </DataContextProvider>
  );
};

export default App;
