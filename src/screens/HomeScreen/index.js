import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import glamorous from 'glamorous-native';
import NavButtons  from '../../global/NavButtons';
import NavBar      from '../../global/NavBar';
import Constants   from '../../global/Constants';
import { inject, observer } from 'mobx-react/native';

const { object } = PropTypes;
@inject('App') @observer
export default class Home extends Component {
  static navigatorButtons = NavButtons.WithSideMenu;
  static navigatorStyle   = NavBar.Default;
  static propTypes = {
    navigator: object,
    App: object,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    const { navigator } = this.props;
    Constants.rootNavigator = navigator;

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.id === 'menu') {
      this.props.navigator.toggleDrawer({
        side: 'right',
        animated: true
      });
    }
  }

  render() {
    return (
      <View>
        <Text>{'Home'}</Text>
      </View>
    );
  }
}