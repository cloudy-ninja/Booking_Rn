// @flow

import Constants from '../../Constants';
import Stores    from '../../../stores';

export default {
  rightButtons: Stores.App.isAndroid
    ? [{  id   : 'menu',
          icon : Constants.Images.SIDE_MENU, }]
    : [{
        id   : 'menu',
        icon : Constants.Images.SIDE_MENU,
      }],
}
