/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    PermissionsAndroid,
    ToastAndroid,
    DeviceEventEmitter,
    FlatList,
    TouchableOpacity,
    Platform
} from 'react-native';

import TtLockModule from 'react-native-ttlock';

export default class test extends Component {
    dataContainer = [];
    /**
     * Ekey or Lock object,which can be get from Server
     */
    lockItemObj = {};
    selectLockMac = "";
    /**
     * uid,the current user id,which can be get from Server.
     * @type {number}
     */
    testUid = 12;

    constructor(props){
        super(props)
        this.state = {
            sourceData:[]
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                   RN TTLock SDK Demo
                </Text>
                <Button title={"Scan BT Lock Device"} onPress={this.requestPermission.bind(this)}/>
                <Button title={"Click to Unlock"} onPress={this.onClickUnlock.bind(this)}/>
                <Button title={"Get log of lock"} onPress={this.onGetLockLog.bind(this)}/>
                <Button title={"Set time to lock"} onPress={this.onSetLockTime.bind(this)}/>
                <Button title={"Reset lock"} onPress={this.onClickResetLock.bind(this)}/>
                <FlatList
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={() => this.onItemClick(item)}>
                            <Text style={styles.lockListItem}>
                                {item.lockName}
                            </Text>
                        </TouchableOpacity>
                    } data={this.state.sourceData} extraData={this.state} />
            </View>
        );
    }

    /**
     * initialization should be done before any other operation of lock.
     *
     */
    initTTlockApi(uid){
        TtLockModule.initTTlockApi(uid)
        this.startBtService()
    }

    onItemClick(item){
        if(item.isSettingMode){
            this.selectLockMac = item.lockMacAddress
            TtLockModule.lockInitialize(item.lockMacAddress,result => {
                this.lockItemObj = JSON.parse(result.lockDataJsonString)
                let initResultString = result.success ? "lock init success" : "lock init fail";
                let errormsg = result.errorCode
                this.show(initResultString)
                if(result.success){
                    this.onStopScanAndListener()
                }
            })
        }
    }

    onClickUnlock(){
        if(this.lockItemObj === null){
            return
        }
        TtLockModule.unlockByUser(this.lockItemObj,map => {
            let unlockNotify = map.success ? "Unlock success" : "Unlock fail" + map.errorCode;
            this.show(unlockNotify)
        })
    }

    onGetLockLog(){
        if(this.lockItemObj === null){
            return
        }
        TtLockModule.getOperateLog(this.lockItemObj,map =>{
            this.show(map.lockOperateLog)
        })
    }


    onClickResetLock(){
        if(this.lockItemObj === null){
            return
        }
        TtLockModule.resetLock(this.lockItemObj,map => {
            let resetString = map.success ? "admin is be deleted" : "delete fail";
            this.show(resetString)
        })
    }

    onSetLockTime(){
        if(this.lockItemObj === null){
            return
        }
        TtLockModule.setLockTime(new Date().getTime(),this.lockItemObj,map => {
            let resetString = map.success ? "lock time is be corrected" : "correct time fail";
            this.show(resetString +  + new Date().getTime())
        })
    }

    async  requestPermission() {
        this.initTTlockApi(this.testUid)
        if(Platform.OS === "android"){
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    {
                        'title':'Need Location Permission',
                        'message':'it can not work without location permission'
                    }
                )
                if(granted === PermissionsAndroid.RESULTS.GRANTED){
                    this.show("get location permission success")
                    this.startScanDevice()
                }else {
                    this.show("get permission fail")
                }
            }catch (e) {
                this.show(e.toString())
            }
        }else {
            this.startScanDevice()
        }

    }

    show(data){
        ToastAndroid.show(data,ToastAndroid.LONG)
    }

    /**
     *
     * @param lockItemMap lock device map object
     * lockName(String) lockMac(String) isSettingMode(Bool) rssi(Number) isTouch(Bool)
     *
     * Notice：same lock device will repeat receive.Only isSettingMode is true the lock can be added.
     */
    updateDataSouce(lockItemMap){
        let endString = lockItemMap.isSettingMode ? "---No Admin---click to add" : "";
        let itemText = lockItemMap.lockName + endString
        let lockObj = {
            key:lockItemMap.lockMac,
            lockName:itemText,
            lockMacAddress:lockItemMap.lockMac,
            isSettingMode:lockItemMap.isSettingMode,
            rssi:lockItemMap.rssi,
            isTouch:lockItemMap.isTouch
        }
        this.filterLockItem(lockObj)
    }

    filterLockItem(newItem){
        let index = -1;
        let arrayLen = this.dataContainer.length;
        for(let i = 0; i < arrayLen; i++){
            let child = this.dataContainer[i];
            if(child.lockMacAddress === newItem.lockMacAddress){
                index = i;
                break
            }
        }

        if(index !== -1){
            this.show("--data change--" + newItem.isSettingMode)
            if(newItem.isSettingMode){
                this.dataContainer.splice(index,1)
                this.dataContainer.splice(0,0,newItem)
            }else {
                this.dataContainer.splice(index,1,newItem)
            }
        }else {
            this.dataContainer.push(newItem)
        }

        this.setState({
            sourceData:this.dataContainer
        })
    }

    /**
     * stop scan and remove listener.
     */
    onStopScanAndListener(){
        TtLockModule.stopBTDeviceScan()
        this.dataContainer = []
        this.setState({
            sourceData:this.dataContainer
        })
        TtLockModule.removeReceiveScanDeviceListener()
    }


    /**
     * start blue tooth service for Android is required
     */
    startBtService(){
        TtLockModule.startBleService()
    }

    /**
     * Scan blueTooth lock，Android 6.0 need ACCESS_COARSE_LOCATION permission。
     */
    startScanDevice(){
        /**
         * add listener of scan device,more info please see README。
         */
        TtLockModule.addReceiveScanDeviceListener(lockItemMap => {
            this.updateDataSouce(lockItemMap)
        })

        TtLockModule.startBTDeviceScan()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    lockListItem:{
        fontSize: 14,
        margin: 8,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('test', () => test);
