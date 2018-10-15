import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class User {
  constructor(getStores) {
    this.getStores = getStores;
  }

  fetch = () => Promise.all([

  ])

  @persist @observable token = '';
  @observable userInfo;

  @action login = (data) => {
    //token
    this.token = data.token
    //userInfo
    this.userInfo = data.user
  }

  @action logout = () => {
    //token
    this.token = '';
  }

}

export default User;