// @flow

import { Navigation } from 'react-native-navigation';

import Constants from '../global/Constants';

import Login        from './LoginScreen';
import Drawer       from './Drawer';
import HomeScreen   from './HomeScreen';
import Register     from './Register';
import Forgot       from './Forgot';
import Booking      from './BookingScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent(Constants.Screens.HOME_SCREEN.screen, () => HomeScreen, store, Provider);

  Navigation.registerComponent(Constants.Screens.DRAWER.screen,              () => Drawer, store, Provider);
  Navigation.registerComponent(Constants.Screens.LOGIN_SCREEN.screen,        () => Login, store, Provider);
  Navigation.registerComponent(Constants.Screens.REGISTER_SCREEN.screen,     () => Register, store, Provider);
  Navigation.registerComponent(Constants.Screens.FORGOT_SCREEN.screen,       () => Forgot, store, Provider);
  Navigation.registerComponent(Constants.Screens.BOOKING_SCREEN.screen,      () => Booking, store, Provider);
}
