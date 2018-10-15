import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import glamorous from 'glamorous-native';
import Constants from '../../global/Constants';

const Container = glamorous(View)({
  flex: 1,
  backgroundColor: '#ffffff',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const WrapFirst = glamorous(View)({
  flexDirection: 'column',
  marginTop: 50,
})

const WrapSecond = glamorous(View)({
  flexDirection: 'column',
  marginBottom: 20,
})

const Button = glamorous(TouchableOpacity)({
  alignItems: 'center',
  borderStyle: 'solid',
  borderBottomWidth: 1,
  borderBottomColor: 'black'
})

const ButtonText = glamorous(Text)({
  fontSize: 30,
  color: 'black',
})

const { object } = PropTypes;
class Drawer extends Component {
  static propTypes = {
    navigator: object,
  }

  constructor(props) {
    super(props);
  }

  login = () => {
    const { navigator } = this.props;
    navigator.toggleDrawer({
      side: 'right',
      animated: true
    });
    Constants.rootNavigator.showModal({
      ...Constants.Screens.LOGIN_SCREEN,
      navigatorStyle: {
        navBarHidden: false
      }
    })
  }

  register = () => {
    const { navigator } = this.props;
    navigator.toggleDrawer({
      side: 'right',
      animated: true
    });
    Constants.rootNavigator.showModal({
      ...Constants.Screens.REGISTER_SCREEN,
      navigatorStyle: {
        navBarHidden: false
      }
    })
  }


  render() {
    return (
      <Container>
        <WrapFirst>
          <Button onPress={() => this.register()}>
            <ButtonText>{`Register`}</ButtonText>
          </Button>
          <Button onPress={() => this.login()}>
            <ButtonText>{`Login`}</ButtonText>
          </Button>
          <Button onPress={() => {}}>
            <ButtonText>{`Book`}</ButtonText>
          </Button>
        </WrapFirst>
        <WrapSecond>
          <Button onPress={() => {}}>
            <ButtonText>{`Logout`}</ButtonText>
          </Button>
        </WrapSecond>
      </Container>
    );
  }
}

export default Drawer;