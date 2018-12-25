'use strict';
import React,{ Component } from 'react';
import TtLockModule from 'react-native-ttlock';
import OperateLock from './operateLock'
let lockScanObjectArray = []
import {
  Text,
  Button,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';



export default class initLock extends Component {

  constructor(props) {
    super(props);
    this.state = {dataSourceChange:false}

  }

  componentDidMount() {

  }

  componentWillUnmount() {
    TtLockModule.removeReceiveScanDeviceListener()
  }

  _renderItem = ({item}) =>  {
    let  titleString = item.isSettingMode ? item.lockName+'  Click InitLock':item.lockName;
    let  buttonColor = item.isSettingMode ? 'blue':'gray';
    return <Button color={buttonColor}  title={titleString} onPress={()=>{
      TtLockModule.lockInitialize(item.lockMac, (dataObj) => {
        if (dataObj.success) {
          this.props.navigator.push({
            component: OperateLock,
            title: "Lock operation ",
            passProps: { lockOjb: JSON.parse(dataObj.lockDataJsonString)}
          });
        }else {

        }
      });
    }}/>
  };

  _separator = () => <View style={{height:1,backgroundColor:'red'}}/>;

  render() {
    if (lockScanObjectArray.length == 0){
      return <View style={styles.container}><Button title={'Start Scan'} onPress={()=>{
        TtLockModule.startBTDeviceScan();
        TtLockModule.addReceiveScanDeviceListener(body => {
          let isContainSanModel = false
          let constainScanModel;
          for (let scanObj of lockScanObjectArray) {
            if (scanObj.lockMac === body.lockMac) {
              isContainSanModel = true
              constainScanModel= scanObj
              break
            }
          }
          if (isContainSanModel){
            constainScanModel.isTouch = body.isTouch
            constainScanModel.isSettingMode = body.isSettingMode
            constainScanModel.rssi = body.rssi
            if (body.isSettingMode) {
              console.log(body.lockName)
            }

          } else {
            lockScanObjectArray.push(body)
          }

          lockScanObjectArray = lockScanObjectArray.sort((a,b)=>{
            return a.isSettingMode < b.isSettingMode
          })

          this.setState({dataSource:lockScanObjectArray});

        })
      }}/></View>
    }
    return (
        <View style={styles.container}>
          <FlatList
              ItemSeparatorComponent = {this._separator}
              data = {lockScanObjectArray}
              renderItem = {this._renderItem}
              extraData = {this.state}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 63,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  itemSettingMode: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
    color:'red'
  },
  itemNoSettingMode: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    height: 44,
    color:'gray'
  },
  item: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
    color:'gray'
  },

});