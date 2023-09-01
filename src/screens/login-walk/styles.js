import { StyleSheet, Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  containerAll: {},
  imgBanner: {
    width: deviceWidth,
    height: (305 / 375) * deviceWidth,
    resizeMode: 'contain',
  },
  imgBottom: {
    width: deviceWidth,
    height: (380 / 1500) * deviceWidth,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBottom: {
    marginTop: 40,
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Sniglet-Regular',
    fontWeight: '400',
  },
  imgLogo: {
    height: (144 / 375) * deviceWidth,
    width: (285 / 375) * deviceWidth,
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'center',
    top: deviceHeight / 2 - 100,
    zIndex: 100,
  },
  containerImg: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 15,
    color: '#000',
  },
  textInput: {
    fontSize: 15,
    flex: 1,
    color: '#000',
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    top: deviceHeight / 2 + 20,
  },
  nextButton: {
    height: (264 / 375) * deviceWidth,
    width: (264 / 375) * deviceWidth,
    resizeMode: 'contain',
  },
});
