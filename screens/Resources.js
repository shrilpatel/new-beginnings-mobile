import * as React from 'react';
import { StyleSheet, View, ScrollView, Text, Button} from 'react-native';
import { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider } from "native-base";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';




export default function Resources({navigation}){
    
  const [data, setData] = useState([]); //for fetching data
  const [loading, setLoading] = useState(true); //for loading page
  const [showEmployment, setShowEmployment] = useState(true); //employment button
  const [showFood, setShowFood] = useState(false); //food button
  const [showHousing, setShowHousing] = useState(false); //housing button
  const [showClothing, setShowClothing] = useState(false); //clothing Button

  const[employmentData, setEmploymentData] = useState([{
    tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
    widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200
    ]}]);

  const [tableData, setTableData] = useState([]);
  const [rowData, setRowData] = useState([]); 
  

  const fetchData = async () => {
    const resp = await fetch("https://apis.yinftw.com/nb/resources/food");
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };

  const makeTable = () => {

    for (let i = 0; i < 30; i += 1) {
      
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
        setRowData(rowData);
      }
      tableData.push(rowData)
      setTableData(tableData);
    }
  };

  useEffect(() => {
    fetchData();
    makeTable();
  }, []);


    return (
      <View>
        <Button title = "Hide" onPress={() => setShowEmployment(showEmployment => !showEmployment)}></Button>
        {showEmployment && 
        <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={employmentData.tableHead} widthArr={employmentData.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={employmentData.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
        </View>
        }
      </View>
    );
  }

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});
