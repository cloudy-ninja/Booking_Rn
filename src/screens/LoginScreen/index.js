// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { CheckBox } from 'react-native-elements'

import NavButtons from '../../global/NavButtons';
import NavBar     from '../../global/NavBar';
import Constants  from '../../global/Constants';
import PropTypes from 'prop-types';
import glamorous from 'glamorous-native';
import { inject, observer } from 'mobx-react/native';
import Api from '../../utils/Api';

const Container = glamorous(View)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  paddingHorizontal: 10,
})

const SignInText = glamorous(Text)({
  fontSize: 30,
  fontWeight: '400',
})

const SignButton = glamorous(TouchableOpacity)({
  alignItems: "center",
  padding: 15,
  marginTop: Constants.platform === 'ios' ? 20 : 10,
  marginBottom: 10,
  borderRadius: 10,
  shadowColor: Constants.Colors.black,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  backgroundColor: Constants.Colors.darkSkyBlue,
  elevation: 3,
  width: '100%'
})

const Avoid = {
  flex: 1,
}

const InputView = glamorous(View)({
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: 'flex-start',
  marginVertical: 10,
  paddingHorizontal: 10,
  borderStyle: "solid",
  borderColor: Constants.Colors.marineTwo,
  borderWidth: 1,
  width: '100%',
  borderRadius: 5,
})


const Edit = {
  width: '100%',
  fontSize: 16,
  height: 40
};

const ForgotButton = glamorous(TouchableOpacity)({
  alignItems: 'center'
})

const SignupButton = glamorous(TouchableOpacity)({
  alignItems: 'center',
})

const SignupText = glamorous(Text)({
  fontSize: 16,
  color: Constants.Colors.skyBlue
})

const ForgotText = glamorous(Text)({
  fontSize: 16,
  color: Constants.Colors.skyBlue
})

const ForgotSignupView = glamorous(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
  paddingHorizontal: 20,
})

const CheckBoxStyle = {
  backgroundColor: 'transparent',
  marginTop: 10,
  marginBottom: 0,
  padding: 0,
  marginLeft: 0,
}

const SignInButtonText = glamorous(Text)({
  fontSize: 16,
  color: Constants.Colors.whiteTwo
})

const checkboxTextStyle = {
  fontSize: 16,
}

const { object } = PropTypes;
@inject('User') @observer
class LoginScreen extends Component {
  static navigatorButtons = NavButtons.Login;
  static navigatorStyle   = NavBar.Default;

  static propTypes = {
    navigator: object,
    User: object,
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      isReady: false,
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    const { navigator } = this.props
    if (event.id === 'back') {
      navigator.popToRoot();
    }
  }

  gotoForgotPage = () => {
    this.props.navigator.showModal({
      ...Constants.Screens.FORGOT_SCREEN,
      navigatorStyle: {
        navBarHidden: false
      }
    })
  }
  gotoSignUp = () => {
    // this.props.navigator.dismissModal();
    this.props.navigator.push({
      ...Constants.Screens.REGISTER_SCREEN,
      navigatorStyle: {
        navBarHidden: false
      }
    })
  }

  signin = async () => {
    const { checked } = this.state
    const { User } = this.props
    this.setState({isReady: true})
    try {
      User.userInfo.rememberCheck
        ? [
            this.email = User.userInfo.email,
            this.password = User.userInfo.password
          ]
        : null

      const { status, data, headers } = await Api.login(this.email, this.password, checked);
      if (status === 200) {
        User.login(data, this.password, checked, headers)
        this.setState({isReady: false})
        this.props.navigator.push({
          ...Constants.Screens.BOOKING_SCREEN,
          navigatorStyle: {
            navBarHidden: false
          }
        })
        // Alert.alert('Login in Successful!')
      }
    } catch (error) {
      this.setState({isReady: false})
      if (error.response.status === 403) {
        Alert.alert('Username or Email is invalid or already taken')
      } else if (error.response.status === 409) {
        Alert.alert('Server Not Found')
      } else {
        Alert.alert('Something Went Wrong!')
      }
    }
  }

  render() {
    const { isReady } = this.state
    const { User } = this.props
    const email = User.userInfo.rememberCheck
      ? User.userInfo.email
        ? User.userInfo.email
        : ''
      : ''
    const password = User.userInfo.rememberCheck
      ? User.userInfo.password
        ? User.userInfo.password
        : ''
      : ''
    return (
      <KeyboardAvoidingView style={Avoid} behavior="padding" enabled>
      {
        isReady
        ? <ActivityIndicator size="small" color="#00ff00"/>
        : <Container>
            <SignInText>{'Please sign in'}</SignInText>
            <InputView>
              <TextInput
                placeholder={'Username or Email address'}
                style={Edit}
                placeholderTextColor={Constants.Colors.marineTwo}
                underlineColorAndroid={'transparent'}
                returnKeyType={'done'}
                autoCorrect={false}
                autoCapitalize={'none'}
                value={email}
                onChangeText={(email) => this.email = email}
                keyboardType={'email-address'}
                onSubmitEditing={() => {}}/>
            </InputView>
            <InputView>
              <TextInput
                placeholder={'Password'}
                style={Edit}
                secureTextEntry
                placeholderTextColor={Constants.Colors.marineTwo}
                underlineColorAndroid={'transparent'}
                returnKeyType={'done'}
                autoCorrect={false}
                autoCapitalize={'none'}
                value={password}
                onChangeText={(password) => this.password = password}
                keyboardType={'email-address'}
                onSubmitEditing={() => {}}/>
            </InputView>
            <ForgotSignupView>
              <ForgotButton onPress={() => this.gotoForgotPage()}>
                <ForgotText>{'Forgotten password?'}</ForgotText>
              </ForgotButton>
              <SignupButton onPress={() => this.gotoSignUp()}>
                <SignupText>{'Sign up'}</SignupText>
              </SignupButton>
            </ForgotSignupView>
            <CheckBox
              containerStyle={CheckBoxStyle}
              checked={this.state.checked}
              title={'Remember me'}
              textStyle={checkboxTextStyle}
              onIconPress={() => this.setState({checked: !this.state.checked})}
            />
            <SignButton onPress={() => this.signin()}>
              <SignInButtonText>{'Sign in'}</SignInButtonText>
            </SignButton>
          </Container>
      }
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
