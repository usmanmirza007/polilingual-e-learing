import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View, Image, Dimensions } from 'react-native';
import { BottomTabItem } from 'app-component';
import { Images } from 'app-assets';
import { createStackNavigator } from 'react-navigation-stack';
import i18next from '../config/translations';
import Home from '../screens/home';
import Courses from '../screens/courses';
import MyCourse from '../screens/my-course';
import Wishlist from '../screens/wishlist';
import Profile from '../screens/profile';
import Settings from '../screens/settings/index';
import YourOrder from '../screens/your-order';
import YourCourses from '../screens/your-courses';

const deviceWidth = Dimensions.get('window').width;

const profileRouter = {
  ProfileScreen: {
    screen: Profile,
    navigationOptions: { headerShown: false },
  },
  SettingsScreen: {
    screen: Settings,
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
};
const stackNavigatorConfig = {
  initialRouteName: 'ProfileScreen',
  mode: 'card', // modal - card
  navigationOptions: {
    gesturesEnabled: true,
    headerTintColor: '#000',
    headerBackTitle: '',
  },
};

const ProfileStack = createStackNavigator(profileRouter, stackNavigatorConfig);

export default createBottomTabNavigator(
  {
    HomeScreen: { screen: Home },
    Courses: { screen: Courses },
    MyCourse: { screen: MyCourse },
    Wishlist: { screen: Wishlist },
    ProfileStackScreen: { screen: ProfileStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor, horizontal }) => {
        const { routeName } = navigation.state;
        const {
          iconTabCoures,
          iconTabProfile,
          iconTabHome,
          iconTabMyCourse,
          iconWishlist,
        } = Images;
        let icon;
        switch (routeName) {
          case 'HomeScreen':
            icon = iconTabHome;
            break;
          case 'Courses':
            icon = iconTabCoures;
            break;
          case 'MyCourse':
            icon = iconTabMyCourse;
            break;
          case 'Wishlist':
            icon = iconWishlist;
            break;
          case 'ProfileStackScreen':
            icon = iconTabProfile;
            break;

          default:
            icon = 'home';
        }

        return (
          <View>
            {tintColor === '#000' && !horizontal && (
              <Image
                source={Images.iconTabActive}
                style={{
                  width: deviceWidth / 8,
                  height: 3,
                  position: 'absolute',
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            )}
            <BottomTabItem.Icon icon={icon} tintColor={tintColor} />
          </View>
        );
      },
      tabBarLabel: ({ tintColor, orientation }) => {
        const { routeName } = navigation.state;
        let name;

        switch (routeName) {
          case 'HomeScreen':
            name = i18next.t('bottomNavigation.home');
            break;
          case 'Courses':
            name = i18next.t('bottomNavigation.courses');
            break;
          case 'MyCourse':
            name = i18next.t('bottomNavigation.myCourse');
            break;
          case 'Wishlist':
            name = i18next.t('bottomNavigation.wishlist');

            break;
          case 'ProfileStackScreen':
            name = i18next.t('bottomNavigation.profile');
            break;
          default:
            name = i18next.t('bottomNavigation.home');
        }

        return (
          <BottomTabItem.Title
            name={name}
            tintColor={tintColor}
            orientation={orientation}
          />
        );
      },
    }),
    tabBarOptions: {
      showLabel: true,
      activeTintColor: '#000',
      style: {
        height: 56,
        borderTopWidth: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderColor: 'transparent',
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 10,
      },
    },
    header: null,
    initialRouteName: 'HomeScreen',
    lazy: false,
    swipeEnabled: false,
    animationEnabled: true,
  }
);
