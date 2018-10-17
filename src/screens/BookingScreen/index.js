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

const Container = glamorous(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const { object } = PropTypes;
@inject('App') @observer
export default class BookingScreen extends Component {
  static navigatorButtons = NavButtons.Login;
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

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.id === 'back') {
      Constants.Global.startSingleScreenApp()
    }
  }

  render() {
    return (
      <Container>
        <Text>{'BookingScreen'}</Text>
      </Container>
    );
  }
}