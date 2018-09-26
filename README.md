
# react-native-ttlock 

## Getting started

`$ npm install react-native-ttlock --save`

### Mostly automatic installation

`$ react-native link react-native-ttlock`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`,Go to `node_modules/react-native-ttlock/ios/TtLockModule/` and add `TtLockModule.xcodeproj`
3. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`,Go to `node_modules/react-native-ttlock/ios/TtLockModule/TtLockModule` and add `TTLock.framework`
3. In XCode, in the project navigator, select your project. Add `TTLock.framework` to your project's `General` ➜ `Embedded Binaries`
4. In XCode,Add Key`Privacy - Bluetooth Peripheral Usage Description` Value `your description for bluetooth` to your project's `info` ➜ `Custom iOS Target Projectes`
5. In XCode, set `No` to your project's `Build Settings` ➜ `Enable Bitcode`
6. In XCode, add `libTtLockModule.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
7. Run your project (`Cmd+R`)<

#### Android

1. Edit your project AndroidManifest.xml
  - Add 
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  - Add service
   <service android:name="com.ttlock.bl.sdk.service.BluetoothLeService" />
   
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-ttlock'
  	project(':react-native-ttlock').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-ttlock/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
   compile project(':react-native-ttlock')

## Usage

###
init TTLock SDK,this must be done before using this conponent.  param uid is get from server.

TtLockModule.initTTlockApi(uid)
/**add listener to receive bluetooth lock before do start scan device,callback will return a map object**/
TtLockModule.addReceiveScanDeviceListener(lockItemMap => {
            let lockMacAddress = lockItemMap.lockMac
			let lockName = lockItemMap.lockName
			let canBeAdded = lockItemMap.isSettingMode
			let rssi = lockItemMap.rssi
			let isKeyboardLight = lockItemMap.isTouch
        })
		
/**For Android scan device need PERMISSIONS.ACCESS_COARSE_LOCATION before do startBTDeviceScan.**/
try {
   const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    {
                        'title':'Need Location Permission',
                        'message':'it can not work without location permission'
                    }
                )
                if(granted === PermissionsAndroid.RESULTS.GRANTED){
                    TtLockModule.startBTDeviceScan()
                }else {
                    
                }
            }catch (e) {
               
            }
