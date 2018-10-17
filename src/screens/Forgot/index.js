// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator
} from 'react-native';

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
  alignItems: 'flex-start',
  paddingHorizontal: 10,
})

const ResetButton = glamorous(TouchableOpacity)({
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

const ResetPasswordText = glamorous(Text)({
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

const ResetText = glamorous(Text)({
  fontSize: 16,
  color: Constants.Colors.whiteTwo
})

const { object } = PropTypes;
@inject('User') @observer
class ForgotScreen extends Component {
  static navigatorButtons = NavButtons.Login;
  static navigatorStyle   = NavBar.Default;

  static propTypes = {
    navigator: object,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isReady: false,
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    const { navigator } = this.props
    if (event.id === 'back') {
      navigator.dismissModal();
    }
  }

  ResetPassword = async (username) => {
    const { navigator } = this.props
    this.setState({isReady: true})
    try {
      const { status } = await Api.resetPassword(username);
      if (status === 200) {
        this.setState({isReady: false})
        navigator.dismissModal()
        Alert.alert('Password Reset Successful. Check your Email!')
      }
    } catch (error) {
      this.setState({isReady: false})
      Alert.alert('Something went wrong!')
    }
  }

  render() {
    const { isReady } = this.state
    return (
      <KeyboardAvoidingView style={Avoid} behavior="padding" enabled>
      {
        isReady
          ? <ActivityIndicator size="small" color="#00ff00"/>
          : <Container>
              <ResetPasswordText>{'Reset Password'}</ResetPasswordText>
              <InputView>
                <TextInput
                  placeholder={'Username or Email address'}
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
              <ResetButton onPress={() => this.ResetPassword(this.state.username)}>
                <ResetText>{'Reset Password'}</ResetText>
              </ResetButton>
            </Container>
      }
      </KeyboardAvoidingView>
    );
  }
}

export default ForgotScreen;
