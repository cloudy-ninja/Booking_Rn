import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import glamorous from 'glamorous-native';
import Constants from '../../global/Constants';
import { inject, observer } from 'mobx-react/native';
import Api from '../../utils/Api';

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
  borderBottomColor: 'black',
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  paddingVertical: 10,
})

const ButtonText = glamorous(Text)({
  fontSize: 20,
  color: 'black',
})

const { object } = PropTypes;
@inject('User') @observer
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
    Constants.rootNavigator.push({
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
    Constants.rootNavigator.push({
      ...Constants.Screens.REGISTER_SCREEN,
      navigatorStyle: {
        navBarHidden: false
      }
    })
  }

  redirectBooking = () => {
    const { navigator } = this.props
    navigator.toggleDrawer({
      side: 'right',
      animated: true
    });
    Constants.rootNavigator.push({
      ...Constants.Screens.BOOKING_SCREEN,
      navigatorStyle: {
        navBarHidden: false
      }
    })
  }

  book = () => {
    const { User } = this.props
    User.cookie
      ? this.redirectBooking()
      : this.login()
  }

  logout = async () => {
    const { User } = this.props
    try {
      const { status } = await Api.logout(User.userInfo.email, User.userInfo.password, User.userInfo.rememberCheck);
      if (status === 200) {
        User.logout();
        Constants.Global.startSingleScreenApp();
      }
    } catch (error) {
      Alert.alert('Something went wrong!')
    }

  }

  render() {
    const { User } = this.props
    return (
      <Container>
        <WrapFirst>
          <Button onPress={() => this.register()}>
            <ButtonText>{`Register`}</ButtonText>
          </Button>
          <Button onPress={() => this.login()}>
            <ButtonText>{`Login`}</ButtonText>
          </Button>
          <Button onPress={() => this.book()}>
            <ButtonText>{`Book`}</ButtonText>
          </Button>
        </WrapFirst>
        {
          User.cookie
            ? <WrapSecond>
                <Button onPress={() => this.logout()}>
                  <ButtonText>{`Logout`}</ButtonText>
                </Button>
              </WrapSecond>
            : null
        }
      </Container>
    );
  }
}

export default Drawer;