// @flow

import { Platform, PixelRatio, Dimensions }   from 'react-native';
import { Navigation } from 'react-native-navigation';
import Constants      from '../Constants';
import TabBar         from '../TabBar';

let rootNavigator = null;
const width = Dimensions.get('window').width*PixelRatio.get()*0.7;

const startTabBasedApp = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        ...Constants.Screens.FIRST_TAB
      },
      {
        ...Constants.Screens.SECOND_TAB
      }
    ],
    ...Platform.select({
        ios: {
          tabsStyle: TabBar.Main,
        },
        android: {
          appStyle: TabBar.Main,
        },
      }),
    drawer: {
      right: {
        screen: Constants.Screens.DRAWER.screen,
        fixedWidth: width
      },
      style: {

      },
      disableOpenGesture: false
    },
  });
}

const startSingleScreenApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      ...Constants.Screens.HOME_SCREEN,
      navigatorStyle: {
        navBarHidden: false
      }
    },
    animationType: 'fade',
    drawer: {
      right: {
        screen: Constants.Screens.DRAWER.screen,
        fixedWidth: width
      },
      style: {
        rightDrawerWidth: 50,
        drawerShadow: true,
        contentOverlayColor: 'rgba(0,0,0,0.1)'
      },
      disableOpenGesture: false
    }
  })
}

const openLoginModalIn = (navigator, withCancelButton) => {
  navigator.showModal({
    ...Constants.Screens.LOGIN_SCREEN,
    passProps: { withCancelButton },
    overrideBackPress: true, // [Android] if you want to prevent closing a modal by pressing back button in Android
  });
}

export default {
  rootNavigator,
  startTabBasedApp,
  startSingleScreenApp,
  openLoginModalIn
}
