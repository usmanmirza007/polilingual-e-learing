import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import styles from './styles/bottom-tab-item';

class BottomTabIcon extends PureComponent {
  render() {
    const { icon, tintColor } = this.props;

    return (
      <View style={styles.container}>
        <Image
          source={icon}
          style={[styles.tabIcon, { tintColor }]}
          resizeMode="contain"
        />
      </View>
    );
  }
}
export default BottomTabIcon;
