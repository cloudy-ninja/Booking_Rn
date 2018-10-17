import axios from 'axios';

const domain = 'http://ec2-35-177-238-70.eu-west-2.compute.amazonaws.com:8080/';

export default class Api {
  //register
  static register(username, email, password) {
    return axios({
      method: 'post',
      url: `${domain}api/users/register`,
      headers: {
          'Content-Type': 'application/json',
      },
      data: {
        login: username,
        email: email,
        password: password
      }
    });
  }
  //login ---> username or email
  static login(username, password, checked) {
    return axios({
      method: 'post',
      url: `${domain}api/users`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        login: username,
        password: password,
        rememberMe: checked
      }
    });
  }
  //logout
  static logout(username, password, checked) {
    return axios({
      method: 'get',
      url: `${domain}api/users/logout`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        login: username,
        password: password,
        rememberMe: checked
      }
    });
  }
  //password reset
  static resetPassword(username) {
    return axios({
      method: 'post',
      url: `${domain}api/passwordreset`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        login: username
      }
    });
  }
}
