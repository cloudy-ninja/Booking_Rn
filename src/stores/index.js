// @flow

import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';

import App     from './App';
import Account from './Account';
import User    from './User';
import Counter from './Counter';

const hydrate = create({ storage: AsyncStorage });

class Stores {

  getStores = () => ({
    Global: this,
    App: this.appStore,
    Account: this.accountStore,
    User: this.userStore,
    Counter: this.counterStore,
  });

  hydrateStores = () =>
    Promise.all(
      [
        hydrate('Account', this.accountStore),
        hydrate('User', this.userStore),
      ]
    );

  fetchData = async () => {
    const stores = this.getStores()
    try {
      const methods = Object.keys(stores).reduce((res, store) => {
        if (stores[store].fetch) res.fetch.push(stores[store].fetch())
        if (stores[store].postfetch) res.postfetch.push(stores[store].postfetch)
        return res
      }, { fetch: [], postfetch: [] })
      await Promise.all(methods.fetch)
      methods.postfetch.map(pf => pf())
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  appStore = new App(this.getStores);
  accountStore = new Account(this.getStores);
  userStore = new User(this.getStores);
  counterStore = new Counter(this.getStores);
}

const stores = new Stores();

export const getStores = stores.getStores

export default {
  instance: stores,
  ...stores.getStores()
};
