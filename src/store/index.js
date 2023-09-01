import { createStore, applyMiddleware, compose } from 'redux';
import { connect } from 'react-redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import AppNavigator from '../navigations';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['debug', 'user', 'wishlist'],
  blacklist: ['navState', 'form', 'network', 'course'],
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const navMiddleware = createReactNavigationReduxMiddleware(
  (state) => state.navState
);

export function configStore() {
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(sagaMiddleware, navMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor };
}

const App = createReduxContainer(AppNavigator);
const mapStateToProps = (state) => ({
  state: state.navState,
});

export default connect(mapStateToProps)(App);
