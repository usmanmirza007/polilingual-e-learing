import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabIcon: {
    width: 20,
    height: 18,
    resizeMode: 'contain',
    position: 'relative',
    tintColor: '#D1D1D1',
  },
  title: {
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    color: '#CECECE',
    zIndex: 100,
  },
});
