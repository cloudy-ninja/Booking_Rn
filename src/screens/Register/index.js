// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import NavButtons from '../../global/NavButtons';
import NavBar     from '../../global/NavBar';
import Constants  from '../../global/Constants';
import PropTypes from 'prop-types';
import glamorous from 'glamorous-native';
import Api from '../../utils/Api';

const Container = glamorous(View)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingHorizontal: 10,
})

const RegisterButton = glamorous(TouchableOpacity)({
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

const SignupText = glamorous(Text)({
  fontSize: 30,
  fontWeight: '400',
})

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

const Avoid = {
  flex: 1,
}

const RegisterText = glamorous(Text)({
  fontSize: 16,
  color: Constants.Colors.whiteTwo
})

const { object } = PropTypes;
class RegisterScreen extends Component {
  static navigatorButtons = NavButtons.Login;
  static navigatorStyle   = NavBar.Default;

  static propTypes = {
    navigator: object,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      repassword: '',
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

  UserRegister = async () => {
    const { username, email, password, repassword} = this.state;
    if(password !== repassword) {
      Alert.alert('Please enter your password again');
      return;
    }
    this.setState({isReady: !this.state.isReady})
    try {
      const { status, data } = await Api.register(username, email, password);
      if (status === 200 && data === 'success') {
        this.setState({isReady: !this.state.isReady})
        this.props.navigator.push({
          ...Constants.Screens.LOGIN_SCREEN,
          navigatorStyle: {
            navBarHidden: false
          }
        })
        Alert.alert('Register successed!')
      }
    } catch (error) {
      this.setState({isReady: !this.state.isReady})
      if(error.response) {
        if(error.response.status === 409) {
          Alert.alert('Username or Email is invalid or already taken')
        } else if (error.response.status === 400 || error.response.status === 404) {
          Alert.alert('Server Not Found')
        }
      } else {
        Alert.alert('Something Went Wrong!')
      }
    }
  }

  render() {
    const { isReady } = this.state;
    return (

      <KeyboardAvoidingView style={Avoid} behavior="padding" enabled>
      {
        isReady
          ? <ActivityIndicator size="small" color="#00ff00"/>
          : <Container>
              <SignupText>{'Please sign up'}</SignupText>
              <InputView>
                <TextInput
                  placeholder={'Username'}
                  style={Edit}
                  placeholderTextColor={Constants.Colors.marineTwo}
                  underlineColorAndroid={'transparent'}
                  returnKeyType={'done'}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  onChangeText={(username) => this.setState({username})}
                  onSubmitEditing={() => {}}/>
              </InputView>
              <InputView>
                <TextInput
                  placeholder={'Email address'}
                  style={Edit}
                  placeholderTextColor={Constants.Colors.marineTwo}
                  underlineColorAndroid={'transparent'}
                  returnKeyType={'done'}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  onChangeText={(email) => this.setState({email})}
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
                  keyboardType={'email-address'}
                  onChangeText={(password) => {this.setState({password})}}
                  onSubmitEditing={() => {}}/>
              </InputView>
              <InputView>
                <TextInput
                  placeholder={'Repeat Password'}
                  style={Edit}
                  secureTextEntry
                  placeholderTextColor={Constants.Colors.marineTwo}
                  underlineColorAndroid={'transparent'}
                  returnKeyType={'done'}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  onChangeText={(repassword) => this.setState({repassword})}
                  onSubmitEditing={() => {}}/>
              </InputView>
              <RegisterButton onPress={() => {this.UserRegister()}}>
                <RegisterText>{'Register'}</RegisterText>
              </RegisterButton>
            </Container>
      }
      </KeyboardAvoidingView>
    );
  }
}

export default RegisterScreen;
