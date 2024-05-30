import { View, Text, StyleSheet,
  Image, Keyboard, TextInput } from 'react-native'
import React from 'react'

import {  height_device, width_device } from '../style/StyleGlobal';


export default function Test() {
 

  return (
    <View style={{flex:1,backgroundColor:"white",justifyContent: 'center', alignItems: 'center'}}>
       
         <Text style={{color:"black"}}>Test</Text>
       
    </View>
  )
}

const style =  StyleSheet.create({
  wrapList :{
      marginTop:(2 / 100) * height_device,
      marginBottom:(4 / 100) *  height_device,
      height:(40 / 100) * height_device,
      width:'80%'
  },
  viewList:{
    height:(45 / 100) *  height_device,
    backgroundColor:'#fbf2c6',
    alignContent:'center',
    borderRadius:6,
    left:(5 / 100) * width_device,
    width:(87/ 100) *  width_device
  }
})