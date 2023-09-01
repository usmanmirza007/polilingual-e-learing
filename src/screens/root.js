import React, { PureComponent } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import AppNavigator from '../store';

const { width, height } = Dimensions.get('window');
class App extends PureComponent {
  render() {
    const { common } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <AppNavigator />

        {common.loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    ...StyleSheet.absoluteFillObject,
  },
});
const mapStateToProps = ({ user, common, wishlist }) => ({
  user,
  common,
  wishlist,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
