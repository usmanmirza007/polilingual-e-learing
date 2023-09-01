import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Images } from 'app-assets';
import styles from './styles/instructor-horizontal';

class InstructorHorizontal extends PureComponent {
  onNavigateDetail = () => {
    const { navigation, item } = this.props;
    navigation.navigate('InstructorScreen', { instructor: item });
  };

  render() {
    const { t, item } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onNavigateDetail}
        style={styles.container}
      >
        <Image
          source={{
            uri:
              item.avatar_url ||
              'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
          }}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {item.nickname}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.childTitle}>
              {t('home.countCourse', {
                count: item.instructor_data?.total_courses || 0,
              })}
            </Text>
            <Text style={styles.childTitle}>
              {t('home.countStudent', {
                count: item.instructor_data?.total_users || 0,
              })}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Images.iconFacebook1} style={styles.icon} />
            <Image source={Images.iconCall} style={styles.icon} />
            <Image source={Images.iconInstagram} style={styles.icon} />
            <Image source={Images.iconTwitter2} style={styles.icon} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withTranslation()(InstructorHorizontal);
