import BottomTabbar from './bottom-tabbar';
import Login from '../screens/login/index';

import LoginWalk from '../screens/login-walk';
import Register from '../screens/register';
import Forgot from '../screens/forgot';
import Settings from '../screens/settings/index';
import YourOrder from '../screens/your-order';
import YourCourses from '../screens/your-courses';
import CoursesSearch from '../screens/courses-search';
import CoursesDetails from '../screens/courses-details';
import Learning from '../screens/learning';
import FinishLearning from '../screens/finish-learning';
import assignment from '../screens/assignment';
import instructor from '../screens/instructor';

const routerConfig = {
  HomeTabScreen: {
    screen: BottomTabbar,
    navigationOptions: { headerShown: false },
  },
  LoginScreen: {
    screen: Login,
    navigationOptions: { headerShown: false },
  },
  LoginWalkScreen: {
    screen: LoginWalk,
    navigationOptions: { headerShown: false },
  },
  RegisterScreen: {
    screen: Register,
    navigationOptions: { headerShown: false },
  },

  SettingsScreen: {
    screen: Settings,
    navigationOptions: { headerShown: false },
  },

  ForgotScreen: {
    screen: Forgot,
    navigationOptions: { headerShown: false },
  },
  YourOrderScreen: {
    screen: YourOrder,
    navigationOptions: { headerShown: false },
  },
  YourCoursesScreen: {
    screen: YourCourses,
    navigationOptions: { headerShown: false },
  },

  CoursesSearchScreen: {
    screen: CoursesSearch,
    navigationOptions: { headerShown: false },
  },
  CoursesDetailsScreen: {
    screen: CoursesDetails,
    navigationOptions: { headerShown: false },
  },
  LearningScreen: {
    screen: Learning,
    navigationOptions: { headerShown: false },
  },
  FinishLearningScreen: {
    screen: FinishLearning,
    navigationOptions: { headerShown: false },
  },
  AssignmentScreen: {
    screen: assignment,
    navigationOptions: { headerShown: false },
  },
  InstructorScreen: {
    screen: instructor,
    navigationOptions: { headerShown: false },
  },
};
export default routerConfig;
