// @flow

import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

import Models from './models';

class Account {
  constructor(getStores) {
    this.getStores = getStores;
  }

  fetch = () => Promise.all([

  ])

  @persist('object', Models.Account) @observable current = new Models.Account
  @persist @observable authorized = false;

  @action login = (username, password) => {
    return new Promise((resolve, reject) => {
      if (username && password) {
        this.authorized = true;
        this.current = { username, password };
        resolve({ message: 'success' });
      } else {
        reject({ message: 'Something is wrong with input data :(' });
      }
    });
  }

  @action logout = () => {
    return new Promise((resolve) => {
      this.authorized = false;
      this.current = {};

      resolve();
    });
  }
}

export default Account;
