import { createStackNavigator } from 'react-navigation-stack';
import { PixelRatio, Platform, Dimensions } from 'react-native';
import routerConfig from './router';

const { width } = Dimensions.get('window');

const extraHeaderConfig =
  PixelRatio.get() <= 2 && Platform.OS === 'ios' ? { minWidth: 800 } : {};

const headerStyle = {
  backgroundColor: '#000',
  borderWidth: 0,
  borderBottomColor: 'transparent',
  shadowColor: 'transparent',
  elevation: 0,
  shadowRadius: 0,
  shadowOffset: {
    height: 0,
  },
};

const headerTitleStyle = {
  alignSelf: 'center',
  width: width * 0.86,
  textAlign: 'center',
  fontSize: 19,
  ...extraHeaderConfig,
};

const stackNavigatorConfig = {
  // initialRouteName: 'LoginWalkScreen',
  initialRouteName: 'HomeTabScreen',
  mode: 'card', // modal - card
  navigationOptions: {
    gesturesEnabled: true,
    headerTintColor: '#000',
    headerBackTitle: '',
    headerStyle,
    headerTitleStyle,
    headerShown: false,
  },
};

const AppNavigator = createStackNavigator(routerConfig, stackNavigatorConfig);

export default AppNavigator;
