import React, { useState,useEffect,useContext } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Table from '../../shared/table';
import { getaccounts, saveperticulars} from "../../services/sharedservices"
import { DaysheetContext } from "./Context/DaysheetContext";
export default function Perticulars() {
  const [state, setState] = useContext(DaysheetContext);
  let [tabledata, onchangetabledata] = useState([]);
  let [columns , onchangecolumns] = useState([]);
  useEffect(()=>{
    populatedata()
  },[]);
  async function populatedata() {
    await getaccounts().then((res)=>{
      let holddata =[];
      let holdtabledata = [];
      res.data.data.forEach(element => {
        let row = {
          label: element.name,
          value: element.id
        }
        holddata.push(row);
        if ( element.name === 'cash') {
          let newrow = {accountid: element.id ,discription:'',jama:element.balance,karchu:0,date: new Date()}
          holdtabledata.push(newrow);
        }
        if ( element.name === 'oilsales') {
          let newrow = {accountid: element.id ,discription:'',jama:state.oilsales,karchu:0,date: new Date()}
          holdtabledata.push(newrow);
        }
        if ( element.name === 'engineoilsales') {
          let newrow = {accountid: element.id ,discription:'',jama:state.engineoilsales,karchu:0,date: new Date()}
          holdtabledata.push(newrow);
        }
      });
      onchangetabledata(holdtabledata);
      let columndata = [
        {
        displayname: 'Name',
        actualname: 'accountid',
        type : 'numeric',
        width: 300,
        editable : false,
        showselection : true,
        optiondata : holddata
        },
        {
          displayname: 'Discription',
          actualname: 'discription',
          type : 'word',
          width: 100,
          editable : true
        },
        {
        displayname: 'Jama',
        actualname: 'jama',
        type : 'numeric',
        width: 100,
        editable : true
        },
        {
        displayname: 'Karchu',
        actualname: 'karchu',
        type : 'numeric',
        width: 100,
        editable : true
        },
    ];
      onchangecolumns(columndata);
      console.log("hi");
    }).catch((err)=>{
      console.log(err)
    })
  }
 
  
  function datachanged(data,rowindex, columnname,value) {
    onchangetabledata([...tabledata]);
  }
  async function submitdata() {
    console.log("hiogdh");
    await saveperticulars(tabledata).then((res)=>{
      console.log(res);
    }).catch()
  }
  function addrow() {
    let newrow = {accountid:-1,discription:'',jama:0,karchu:0,date:  new Date()}
    onchangetabledata([...tabledata,newrow]);
  }
  function removerow() {
    let data =tabledata.pop();
    onchangetabledata([...data]);
  }
  return (
    <View>
    <Table tabledata = {tabledata} columns = {columns} datachanged = {datachanged}/>
    <View style = {tablestyles.flexview}>
      <Button title="Addrow" onPress={addrow}/>
      <Button title="Removelastrow" onPress={removerow}/>
    </View>
    <Button title="Submit" onPress={submitdata}/>
    </View>
  );
  };

  const tablestyles = StyleSheet.create({
    container : {
      width :800
    },
    flexview : {
      flexDirection : 'row',
      padding:10,
      justifyContent : 'space-between'
    }
  })