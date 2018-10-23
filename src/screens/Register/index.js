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
  Image
} from 'react-native';

import NavButtons from '../../global/NavButtons';
import NavBar     from '../../global/NavBar';
import IONIcons   from 'react-native-vector-icons/Ionicons';
import Constants  from '../../global/Constants';
import PropTypes from 'prop-types';
import glamorous from 'glamorous-native';
import Api from '../../utils/Api';

const Container = glamorous(View)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 40,
})

const LogoView = glamorous(View)({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: 25,
})

const UserIcon = glamorous(IONIcons)()

const EmailIcon = glamorous(IONIcons)()

const LockIcon = glamorous(IONIcons)()

const KeyIcon = glamorous(IONIcons)()

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
  backgroundColor: Constants.Colors.black,
  elevation: 3,
  width: '100%'
})

const SignupText = glamorous(Text)({
  fontSize: 18,
  fontWeight: '400',
  color: Constants.Colors.blackColor
})

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
  width: '100%',
  borderRadius: 5,
})

const Edit = {
  width: '100%',
  fontSize: 16,
  height: 45,
  paddingLeft: 10,
  alignSelf: 'center',
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
              <LogoView>
                <Image source={require('../../../img/logoText.png')}/>
              </LogoView>
              <SignupText>{'Sign up'}</SignupText>
              <InputView>
                <UserIcon name='md-person' size={24} color={'#000'}/>
                <TextInput
                  placeholder={'Name'}
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
                <EmailIcon name='ios-mail' size={24} color={'#000'}/>
                <TextInput
                  placeholder={'Email'}
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
                <LockIcon name='md-lock' size={24} color={'#000'} />
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
                <KeyIcon name='ios-key' size={24} color={'#000'}/>
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
                <RegisterText>{'SIGN UP'}</RegisterText>
              </RegisterButton>
            </Container>
      }
      </KeyboardAvoidingView>
    );
  }
}

export default RegisterScreen;
