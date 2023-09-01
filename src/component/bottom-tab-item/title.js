import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import styles from './styles/bottom-tab-item';

export default class BottomTabTitle extends PureComponent {
  render() {
    const { name, tintColor, orientation } = this.props;

    return (
      <Text
        style={[
          styles.title,
          {
            color: tintColor || '#D1D1D1',
            marginLeft: orientation === 'horizontal' ? 15 : 0,
          },
        ]}
      >
        {name}
      </Text>
    );
  }
}
