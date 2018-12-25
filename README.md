
# install react-native-ttlock lib

## Getting started

`$ npm install react-native-ttlock --save`

### Mostly automatic installation

`$ react-native link react-native-ttlock`

### Manual installation


#### iOS

1. In XCode, drag `TTLock.framework` from `node_modules/react-native-ttlock/ios/TtLockModule/TtLockModule` to project navigator `Libraries`
2. In XCode, in the project navigator, select your project. Add `TTLock.framework` to your project's `General` ➜ `Embedded Binaries`
3. In XCode,Add Key`Privacy - Bluetooth Peripheral Usage Description` Value `your description for bluetooth` to your project's `info` ➜ `Custom iOS Target Projectes`
4. Run your project (`Cmd+R`)<

#### Android

1. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-ttlock'
  	project(':react-native-ttlock').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-ttlock/android')
  	```
2 Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
   compile project(':react-native-ttlock')
  ```
  
### Android need to add more configuration:

##### 1. config repositories in `android/build.gradle`:

```
allprojects {
    repositories {
    
      flatDir{
         dirs "$rootDir/../node_modules/react-native-ttlock/android/libs"
      }
    }
}
```   
##### 2. add permission and service inAndroidManifest.xml:

  Add permission 
  ```
  <uses-permission android:name="android.permission.VIBRATE" />
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
  <uses-permission android:name="android.permission.BLUETOOTH" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  ```
  Add service
  ```
  <service android:name="com.ttlock.bl.sdk.service.BluetoothLeService" />
   ```

