
# react-native-custom-modal

## Getting started

`$ npm install react-native-custom-modal --save`

### Mostly automatic installation

`$ react-native link react-native-custom-modal`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-custom-modal` and add `RNCustomModal.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCustomModal.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNCustomModalPackage;` to the imports at the top of the file
  - Add `new RNCustomModalPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-custom-modal'
  	project(':react-native-custom-modal').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-custom-modal/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-custom-modal')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNCustomModal.sln` in `node_modules/react-native-custom-modal/windows/RNCustomModal.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Custom.Modal.RNCustomModal;` to the usings at the top of the file
  - Add `new RNCustomModalPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNCustomModal from 'react-native-custom-modal';

// TODO: What to do with the module?
RNCustomModal;
```
  