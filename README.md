# React Native Navigation + MobX (w/ Provider) Boilerplate 👽

A simple boilerplate based on MobX (w/ Provider) instead of Redux and [wix/react-native-navigation](https://github.com/wix/react-native-navigation).

##### What's in package.json
- `react '16.3.1'`
- `react-native '0.55.4'`
- `react-native-navigation '1.1.491'`
- `mobx '4.3.1'`
- `mobx-persist '0.4.1'`
- `mobx-react '5.3.4'`

# Installation
1. Clone this repo: `git clone `
2. Inside the directory , update npm. `npm update`
3. Make sure yarn is installed. `npm install -g yarn` (https://yarnpkg.com/en/docs/install)
4. Install node modules: `yarn install`.
5. `react-native run-ios` or `react-native run-android` (if you have any errors while building the project for iOS, remove the `ios/build` directory or visit [facebook/react-native/issues/7308](https://github.com/facebook/react-native/issues/7308) for more information).
6. Enjoy :)

# Common Errors and solutions

1. error: Build input file cannot be found:node_modules/react-native/third-party/double-conversion-1.1.6/src/diy-fp.cc'

Just run the command again.

See https://github.com/facebook/react-native/issues/21168


2.CFBundleIdentifier", Does Not Exist

Command failed: /usr/libexec/PlistBuddy -c Print:CFBundleIdentifier build/Build/Products/Debug-iphonesimulator/booking.app/Info.plist
Print: Entry, ":CFBundleIdentifier", Does Not Exist

Solution: `react-native upgrade` . Say yes to changes to all files

See https://github.com/facebook/react-native/issues/12737

