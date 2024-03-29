import React, { useState } from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tablecell(props) {
    let [eachcell, onchangecell] = useState(props.celldata); 
   function changedata(value) {
    onchangecell(value);
    props.changingtabledata(props.rowindex ,props.eachcol.actualname, value)
   }
   
    return (
        <>
           <TextInput
            style={[tablestyles.input,{width: props.eachcol.width}]}
            onChangeText = {changedata}
            value={eachcell}
            keyboardType = {props.eachcol.type}
            editable = {props.eachcol.editable} 
            />
        </>
    );
}
const tablestyles = StyleSheet.create({
    input: {
      borderWidth: 1,
      alignItems: "center",
      textAlign : "center",
      padding: 10
    }
  })