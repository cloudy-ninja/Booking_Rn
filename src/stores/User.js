import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class User {
  constructor(getStores) {
    this.getStores = getStores;
  }

  fetch = () => Promise.all([

  ])

  @persist @observable cookie = '';
  @persist @observable userInfo = {
    id: '',
    username: '',
    rememberCheck: false,
    email: '',
    password: '',
    created: '',
  };

  @action login = (data, password, checked, headers) => {
    //token
    this.cookie = headers['set-cookie']
    //userInfo
    this.userInfo.email = data.email
    this.userInfo.password = password
    this.userInfo.rememberCheck = checked
    this.userInfo.id = data.id
    this.userInfo.username = data.login
    this.userInfo.created = data.createdOn
  }

  @action logout = () => {
    //token
    this.cookie = ''
  }

}

export default User;