# Note: The demo has been deprecated.  The new plugin and demo https://github.com/ttlock/react-native-ttlock


# react-native-ttlock 

## Developers Email list
ttlock-developers-email-list@googlegroups.com

## install and link lib

 1. `$ npm install react-native-ttlock@1.1.0 --save`

 2. `$ react-native link react-native-ttlock`

## add configuration to project


#### iOS

1. In XCode,Add Key`Privacy - Bluetooth Peripheral Usage Description` Value `your description for bluetooth` to your project's `info` ➜ `Custom iOS Target Projectes`
2. Run your project (`Cmd+R`)<

Note: If you have installed versions before 1.0.4,please remove TTLock.framework in XCode 

#### Android

1. config repositories in `android/build.gradle`:

```
allprojects {
    repositories {
    
      flatDir{
         dirs "$rootDir/../node_modules/react-native-ttlock/android/libs"
      }
    }
}
```   

2.Add permission 
  ```
  <uses-permission android:name="android.permission.VIBRATE" />
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
  <uses-permission android:name="android.permission.BLUETOOTH" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  ```
3.Add service
  ```
  <service android:name="com.ttlock.bl.sdk.service.BluetoothLeService" />
   ```
## Use module in Project App.js
```
 import TtLockModule from 'react-native-ttlock';

 TtLockModule.initTTlockApi(uid)
```


