import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
  },

  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: '#000',
    marginBottom: 12,
  },
  viewFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lable: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#444',
    width: 150,
  },
  txtItem: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#5C5C5C',
  },
  txtDescription: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#666',
  },
  btn: {
    fontFamily: 'Poppins',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FBC815',
    alignSelf: 'flex-start',
    marginTop: 20,
    borderRadius: 4,
  },
  txtBtn: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#000',
  },
});
