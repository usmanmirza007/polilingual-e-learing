import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Client } from 'app-api';
import styles from './styles/assignment';

class Assignment extends PureComponent {
  onNavigateDetail = async () => {
    const { navigation, data } = this.props;
    const response = await Client.startAssignment({ id: data.id });
    if (response.data.status === 200) {
      navigation.navigate('AssignmentScreen', { dataParam: data });
    } else {
      Alert.alert('Polilengua E-learning!', response.message);
    }
  };

  render() {
    const { t, data } = this.props;
    // const systemFonts = ['Poppins', ...defaultSystemFonts];

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t('learningScreen.assignment.title')}</Text>
        <View style={styles.viewFlex}>
          <Text style={styles.lable}>
            {t('learningScreen.assignment.acceptAllowed')}
          </Text>
          <Text style={styles.txtItem}>{data.files_amount}</Text>
        </View>
        <View style={styles.viewFlex}>
          <Text style={styles.lable}>
            {t('learningScreen.assignment.durations')}
          </Text>
          <Text style={styles.txtItem}>{data.duration.format}</Text>
        </View>
        <View style={styles.viewFlex}>
          <Text style={styles.lable}>
            {t('learningScreen.assignment.passingGrade')}
          </Text>
          <Text style={styles.txtItem}>
            {t('learningScreen.assignment.point', {
              point: data.passing_grade,
            })}
          </Text>
        </View>
        <Text style={[styles.title, { marginTop: 20 }]}>
          {t('learningScreen.assignment.overview')}
        </Text>
        <Text style={styles.txtDescription}>{data.introdution}</Text>
        <TouchableOpacity style={styles.btn} onPress={this.onNavigateDetail}>
          <Text style={styles.txtBtn}>
            {t('learningScreen.assignment.start')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withTranslation()(Assignment);
