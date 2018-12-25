/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import InitLock from './initLock'
import TtLock from 'react-native-ttlock';


import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  NavigatorIOS,
} from 'react-native';

export default class test extends Component {
  constructor(props){
    super(props)
    let uid = 12
    TtLock.initTTlockApi(uid)
  }

  render() {
    return (
        <NavigatorIOS
            initialRoute={{
              component: InitLock,
              title: "InitLock",
              passProps: { index: 1 }
            }}
            style={{ flex: 1 }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

});

AppRegistry.registerComponent('test', () => test);
