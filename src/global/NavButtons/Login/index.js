// @flow

import Constants from '../../Constants';
import Stores    from '../../../stores';

export default {
  leftButtons: Stores.App.isAndroid ? [{ id:'cancel' }] : [{
    id    : 'back',
    icon  : Constants.Images.ICON_RECIPE_BACK,
  }],

  // rightButtons: [{
  //   id    : '...',
  //   title : '...',
  // }],
}
