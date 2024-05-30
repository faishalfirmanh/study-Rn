/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { css_global } from './src/style/StyleGlobal';

import {
  StyleSheet,
  LogBox,
  Image
} from 'react-native';
import { View, Text } from 'react-native';
import Acount from './src/page/Acount';
import Home from './src/page/Home';
import Test from './src/page/Test';


const Stack = createNativeStackNavigator();

const App = () => {

  const [user, setUser] = useState({})
  const [userLogin, setUserLogin] = useState({})
  const [product, setProduct] = useState({});
  const [dataBlueTooth, setDataBlueTooth] = useState({});
  const [dataListcBlueToothConnect, setListBlueToothConnect] = useState({});

  useEffect(() => {
    const user = {
       name : 'zlatan',
       image : 'https://awsimages.detik.net.id/community/media/visual/2023/06/05/zlatan-ibrahimovic-4_169.jpeg?w=600&q=90'
    }
    console.log("app",userLogin);
  }, [])

  	
  LogBox.ignoreLogs(['Remote debugger']);
  const appContextValue = {
    user,
    setUser,
    userLogin,
    setUserLogin,
    product,
    setProduct,
    dataBlueTooth,
    setDataBlueTooth,
    setListBlueToothConnect,
    dataListcBlueToothConnect
  }

  const bottomTap =  createBottomTabNavigator();

  function Tablist() {
    return(
      <bottomTap.Navigator>
          <bottomTap.Screen name="listInput" component={ListPage} options={{headerShown: false}}/>
          <bottomTap.Screen name="listKeranjang" component={ListKeranjang} options={{headerShown: false}}/>
          <bottomTap.Screen name="Acount" component={Acount} options={{headerShown: false}}/>
      </bottomTap.Navigator>
    )
  }
  

  return (
  
  <NavigationContainer>
      <bottomTap.Navigator screenOptions={{tabBarShowLabel:false}} initialRouteName={Home}>
          <bottomTap.Screen name="Home" component={Home} 
            options={{
                headerShown: false,
                tabBarIcon:({focused})=>(
                    <View>
                        <Image 
                        source={require('./src/img/Home-2.png')} 
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            left:5,
                            tintColor: focused ? 'red' : 'black'
                        }}
                        />
                        <Text style={focused ? css_global.textTapOn : css_global.textTapOff }>Home</Text>
                    </View>
                )
            }}
          />
          <bottomTap.Screen name="Test" component={Test} options={{
                headerShown: false,
                tabBarIcon:({focused})=>(
                    <View>
                        <Image 
                        source={require('./src/img/show.png')} 
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            left:0,
                            tintColor: focused ? 'red' : 'black'
                        }}
                        />
                        <Text style={focused ? css_global.textTapOn : css_global.textTapOff }>Test</Text>
                    </View>
                )
            }}/>
          <bottomTap.Screen name="Acount" component={Acount} options={{
                headerShown: false,
                tabBarIcon:({focused})=>(
                    <View>
                        <Image 
                        source={require('./src/img/acount.png')} 
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            left:5,
                            tintColor: focused ? 'red' : 'black'
                        }}
                        />
                        <Text style={focused ? css_global.textTapOn : css_global.textTapOff }>Profile</Text>
                    </View>
                )
            }}/>
      </bottomTap.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "white",
    flex:1
  }
});

export default App;
