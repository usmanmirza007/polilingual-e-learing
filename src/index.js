import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Root } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import codePush from 'react-native-code-push';
import './config/translations';
import RootScreen from './screens/root';
import { configStore } from './store/index';
import { reset } from './actions/navigation';
import { setToken } from './api/config';
import { saveStatusNetwork } from './actions/network';
import { CODE_PUSH } from './config';

const { store, persistor } = configStore();

export { store };
class MyApp extends Component {
  async componentDidMount() {
    try {
      const deploymentKey =
        Platform.OS === 'ios' ? CODE_PUSH.ios : CODE_PUSH.android;
      await codePush.sync({
        deploymentKey,
        installMode: codePush.InstallMode.IMMEDIATE,
      });
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  checkInternetConnection = async (state) => {
    try {
      await store.dispatch(saveStatusNetwork(state.isConnected));
    } catch (e) {
      console.log(e);
    }
  };

  onBeforeLift = async () => {
    NetInfo.addEventListener(this.checkInternetConnection);

    const { user } = store.getState();

    if (user?.token) {
      setToken(user?.token);
      store.dispatch(reset(['HomeTabScreen']));
    }
  };

  render() {
    return (
      <Root>
        <Provider store={store}>
          <PersistGate
            onBeforeLift={this.onBeforeLift}
            loading={null}
            persistor={persistor}
          >
            <StatusBar
              translucent
              backgroundColor="rgba(255,255,255,0.1)"
              barStyle="dark-content"
            />
            <RootScreen />
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}

const App = codePush(MyApp);
export default App;
