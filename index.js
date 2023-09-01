/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
// eslint-disable-next-line import/imports-first
import 'react-native-gesture-handler';

// eslint-disable-next-line no-undef
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
