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
  Image
} from 'react-native';
import { CheckBox } from 'react-native-elements'

import NavButtons from '../../global/NavButtons';
import NavBar     from '../../global/NavBar';
import Constants  from '../../global/Constants';
import IONIcons   from 'react-native-vector-icons/Ionicons';
import MAIcons    from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import glamorous from 'glamorous-native';
import { inject, observer } from 'mobx-react/native';
import Api from '../../utils/Api';

const Container = glamorous(View)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  paddingHorizontal: 40,
})

const LogoView = glamorous(View)({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: 25,
})

const LogoImage = glamorous(Image)({
  // width: 280,
  // height: 70,
})

const SignForm = glamorous(View)({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

const SignInText = glamorous(Text)({
  fontSize: 18,
  fontWeight: '400',
})

const EmailIcon = glamorous(IONIcons)()

const LockIcon = glamorous(IONIcons)()

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
  backgroundColor: Constants.Colors.black,
  elevation: 3,
  width: '100%'
})

const Avoid = {
  flex: 1,
}

const InputView = glamorous(View)({
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: 'center',
  marginVertical: 10,
  paddingHorizontal: 10,
  shadowColor: Constants.Colors.black,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  backgroundColor: Constants.Colors.whiteTwo,
  elevation: 3,
  width: '100%',
  borderRadius: 5,
})


const EditEmail = {
  width: '100%',
  fontSize: 16,
  height: 45,
  paddingLeft: 10,
  alignSelf: 'center',
};

const EditPassword = {
  width: '100%',
  fontSize: 16,
  height: 45,
  paddingLeft: 12,
  alignSelf: 'center',
};

const ForgotButton = glamorous(TouchableOpacity)({
  alignItems: 'center'
})

const SignupButton = glamorous(TouchableOpacity)({
  alignItems: 'center',
  marginTop: 10,
})

const SignupText = glamorous(Text)({
  fontSize: 16,
  color: Constants.Colors.skyBlue
})

const ForgotText = glamorous(Text)({
  fontSize: 15,
  color: Constants.Colors.skyBlue
})

const ForgotSignupView = glamorous(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 10,
  width: '100%'
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
      email: '',
      password: '',
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
    const { checked, email, password } = this.state
    const { User } = this.props
    this.setState({isReady: true})
    try {
      const { status, data, headers } = await Api.login(email, password, checked);
      if (status === 200) {
        User.login(data, password, checked, headers)
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
      if(error.response) {
        if (error.response.status === 403) {
          Alert.alert('Username or Email is invalid or already taken')
        } else if (error.response.status === 409 || error.response.status === 400) {
          Alert.alert('Server Not Found')
        }
      } else {
        Alert.alert('Something Went Wrong!')
      }
    }
  }

  componentWillMount = () => {
    const { User } = this.props

     this.setState({ email: User.userInfo.rememberCheck
      ? User.userInfo.email
        ? User.userInfo.email
        : ''
      : '',
      password: User.userInfo.rememberCheck
      ? User.userInfo.password
        ? User.userInfo.password
        : ''
      : ''
      })
  }


  render() {
    const { isReady, email, password } = this.state

    return (
      <KeyboardAvoidingView style={Avoid} behavior="padding" enabled>
      {
        isReady
        ? <ActivityIndicator size="small" color="#00ff00"/>
        : <Container>
            <LogoView>
              <LogoImage
                source={require('../../../img/logoText.png')}
              />
            </LogoView>
            <SignForm>
              <SignInText>{'Sign in'}</SignInText>
              <InputView>
                <EmailIcon name='ios-mail' size={24} color={'#000'}/>
                <TextInput
                placeholder={'Email'}
                style={EditEmail}
                placeholderTextColor={Constants.Colors.marineTwo}
                underlineColorAndroid={'transparent'}
                returnKeyType={'done'}
                autoCorrect={false}
                autoCapitalize={'none'}
                value={email}
                onChangeText={(email) => this.setState({ email })}
                keyboardType={'email-address'}
                onSubmitEditing={() => {}}/>
              </InputView>
              <InputView>
                <LockIcon name='md-lock' size={24} color={'#000'} />
                <TextInput
                  placeholder={'Password'}
                  style={EditPassword}
                  secureTextEntry
                  placeholderTextColor={Constants.Colors.marineTwo}
                  underlineColorAndroid={'transparent'}
                  returnKeyType={'done'}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  value={password}
                  onChangeText={(password) => this.setState({ password })}
                  keyboardType={'email-address'}
                  onSubmitEditing={() => {}}/>
              </InputView>
              <ForgotSignupView>
                <CheckBox
                containerStyle={CheckBoxStyle}
                checked={this.state.checked}
                title={'Remember me'}
                textStyle={checkboxTextStyle}
                onIconPress={() => this.setState({checked: !this.state.checked})}
                />
                <ForgotButton onPress={() => this.gotoForgotPage()}>
                  <ForgotText>{'Forgot Password?'}</ForgotText>
                </ForgotButton>
              </ForgotSignupView>
            </SignForm>
            <SignButton onPress={() => this.signin()}>
              <SignInButtonText>{'SIGN IN'}</SignInButtonText>
            </SignButton>
            <SignupButton onPress={() => this.gotoSignUp()}>
              <SignupText>{'SIGN UP'}</SignupText>
            </SignupButton>
          </Container>
      }
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
