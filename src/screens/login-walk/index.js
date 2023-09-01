import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Image,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Images } from 'app-assets';
import { COPYRIGHTS } from 'app-config';

import { connect } from 'react-redux';

import styles from './styles';

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  skipLogin = () => {
    const { navigation } = this.props;
    navigation.navigate('LoginScreen');
  };

  render() {
    const { isLoading } = this.state;
    const { navigation } = this.props;
    const isBack = navigation.getParam('isBack');
    return (
      <View style={styles.container}>
        <Image source={Images.iconBannerLogin} style={styles.imgBanner} />
        <Image source={Images.EdumaLogin} style={styles.imgLogo} />
        <TouchableOpacity style={styles.button} onPress={this.skipLogin}>
          <Image source={Images.iconNextLogin} style={styles.nextButton} />
        </TouchableOpacity>
        <ImageBackground source={Images.bottomLogin} style={styles.imgBottom}>
          <Text style={styles.textBottom}>{COPYRIGHTS}</Text>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = ({ network }) => ({
  network,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Register);
