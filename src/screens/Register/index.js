// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';

import NavButtons from '../../global/NavButtons';
import NavBar     from '../../global/NavBar';
import Constants  from '../../global/Constants';
import PropTypes from 'prop-types';
import glamorous from 'glamorous-native';

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

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    const { navigator } = this.props
    if (event.id === 'back') {
      navigator.dismissModal();
    }
  }

  render() {

    return (
      <KeyboardAvoidingView style={Avoid} behavior="padding" enabled>
        <Container>
          <SignupText>{'Please sign up'}</SignupText>
          <InputView>
            <TextInput placeholder={'Email address'}
                          style={Edit}
                          placeholderTextColor={Constants.Colors.marineTwo}
                          underlineColorAndroid={'transparent'}
                          returnKeyType={'done'}
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          keyboardType={'email-address'}
                          onSubmitEditing={() => {console.log('submmit====>')}}/>
          </InputView>
          <InputView>
            <TextInput placeholder={'Password'}
                          style={Edit}
                          secureTextEntry
                          placeholderTextColor={Constants.Colors.marineTwo}
                          underlineColorAndroid={'transparent'}
                          returnKeyType={'done'}
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          keyboardType={'email-address'}
                          onSubmitEditing={() => {}}/>
          </InputView>
          <InputView>
            <TextInput placeholder={'Repeat Password'}
                          style={Edit}
                          secureTextEntry
                          placeholderTextColor={Constants.Colors.marineTwo}
                          underlineColorAndroid={'transparent'}
                          returnKeyType={'done'}
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          keyboardType={'email-address'}
                          onSubmitEditing={() => {}}/>
          </InputView>
          <RegisterButton>
            <RegisterText>{'Register'}</RegisterText>
          </RegisterButton>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

export default RegisterScreen;
