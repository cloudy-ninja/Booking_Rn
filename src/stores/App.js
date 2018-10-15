// @flow

import { Platform } from 'react-native';
import { observable } from 'mobx';

class App {
  @observable rootNavigator = null; // so we can nagigate from DRAWER

  @observable isAndroid = Platform.OS === 'android';
  @observable isIOS     = Platform.OS === 'ios';

  constructor(getStores) {
    this.getStores = getStores;
  }

  fetch = () => Promise.all([

  ])
}

export default App;
