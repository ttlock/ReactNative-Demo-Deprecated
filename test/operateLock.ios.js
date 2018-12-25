'use strict';
import React,{ Component } from 'react';
import TtLockModule from 'react-native-ttlock';

import {
  Text,
  Button,
  FlatList,
  Alert,
  View, StyleSheet,
} from 'react-native';

let optionArray = [{'operate':'Unlock','index':0},{'operate':'OperationLog','index':1},{'operate':'SetLockTime','index':2},{'operate':'DeleteLock','index':3}];
export default class operateLock extends Component {

  constructor(props) {
    super(props);
    this.state = {reload:false}

  }

  showAlertTitle(title){
    Alert.alert(
        '',
        title,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
    )
  }

  _renderItem = ({item}) =>  <Button style={styles.item} title={item.operate} onPress={()=>{
    TtLockModule.startBTDeviceScan();
    if (item.index === 0) {
      TtLockModule.unlockByUser(this.props.lockOjb,(dataOjb)=>{
        if (dataOjb.success){
          this.showAlertTitle('unlock Success')
          console.log('Unlock Success');
        } else {

        }

      });
    }else if(item.index === 1){
      TtLockModule.getOperateLog(this.props.lockOjb,(dataOjb)=>{
        if (dataOjb.success){
          this.showAlertTitle('get operation log success'  + dataOjb.lockOperateLog)
        } else {

        }
      });
    }else if(item.index === 2){
      const timeValue = (new Date()).valueOf();
      TtLockModule.setLockTime(timeValue,this.props.lockOjb,(dataOjb)=>{
        if (dataOjb.success){
          this.showAlertTitle('set lock Time Success' + timeValue.toString())
        } else {

        }
      });
    }else if(item.index === 3){
      TtLockModule.resetLock(this.props.lockOjb,(dataOjb)=>{
        if (dataOjb.success){
          console.log('delete lock success');
          this.props.navigator.pop();
        } else {

        }
      });
    }

  }}/>;


  _separator = () => <View style={{height:1,backgroundColor:'red'}}/>;

  render() {
    return (
        <View style={styles.container}>
          <FlatList
              ItemSeparatorComponent = {this._separator}
              data = {optionArray}
              renderItem = {this._renderItem}
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
  item: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  headerText: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
    color:'black',
  },
});