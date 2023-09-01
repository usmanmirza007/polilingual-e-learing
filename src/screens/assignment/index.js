import React, { PureComponent } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { withTranslation } from 'react-i18next';
import { Images } from 'app-assets';
import { Client } from 'app-api';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { tronLog } from 'app-common';
import { RenderDataHTML } from 'app-component';
import DocumentPicker from 'react-native-document-picker';
import styles from './styles';
import CountDown from '../../component/common/countdown';

import { showLoading } from '../../actions/common';

class Assignment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.dataParam = null;
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.dataParam = navigation.state.params?.dataParam;
    this.forceUpdate();
    const response = await Client.getAssignment(this.dataParam.id);
    tronLog('response123123123', response);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.onBack(); // works best when the goBack is async
    return true;
  };

  onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onChooseFile = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.allFiles,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.zip,
          DocumentPicker.types.images,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
          DocumentPicker.types.plainText,
        ],
      });
      tronLog('aaaaaaa', res);
      this.setState({ file: res[0] });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  onSave = async () => {
    const { dispatch } = this.props;
    const { file, note } = this.state;
    const param = new FormData();
    param.append('action', 'save');
    param.append('id', this.dataParam.id);
    param.append('note', note);
    param.append('file[]', file);

    await dispatch(showLoading(true));
    const response = await Client.saveSendAssignment(param);
    await dispatch(showLoading(false));
    tronLog('response', response);
    Alert.alert(response?.message);
  };

  onSend = async () => {
    const { dispatch } = this.props;
    const { file, note } = this.state;
    const formData = new FormData();
    const param = new FormData();
    param.append('action', 'send');
    param.append('id', this.dataParam.id);
    param.append('note', note);
    param.append('file[]', file);
    formData.append(file);
    await dispatch(showLoading(true));
    const response = await Client.saveSendAssignment(param);
    await dispatch(showLoading(false));
    Alert.alert(response?.message);
    tronLog('response', response);
  };

  render() {
    tronLog('data11111', this.dataParam);
    const { t } = this.props;
    const { file } = this.state;
    return (
      <KeyboardAwareScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.header}>
          <View style={styles.header1}>
            <TouchableOpacity
              onPress={this.onBack}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Image source={Images.iconBack} style={styles.iconBack} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {t('learningScreen.assignment.title')}
            </Text>
            <View style={styles.iconBack} />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.content}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.viewDuration}>
            {this.dataParam && (
              <CountDown
                duration={this.dataParam?.duration.time}
                textStyle={styles.txtDuration}
              />
            )}
            <Text style={styles.txtDuration}>
              {t('learningScreen.assignment.timeRemaining')}
            </Text>
          </View>
          <Text style={styles.title}>
            {t('learningScreen.assignment.contentTitle')}
          </Text>
          <RenderDataHTML html={this.dataParam?.content} />
          <Text style={styles.title}>
            {t('learningScreen.assignment.answer')}
          </Text>

          <TextInput
            style={styles.inputSearch}
            multiline
            onChangeText={(value) => {
              this.setState({ note: value });
            }}
          />
          <View style={styles.viewChooseFile}>
            <TouchableOpacity
              onPress={this.onChooseFile}
              style={styles.btnChoose}
            >
              <Text>{t('learningScreen.assignment.chooseFile')}</Text>
            </TouchableOpacity>
            <Text style={styles.txtFileSelect}>
              {file ? file.name : t('learningScreen.assignment.nofile')}
            </Text>
          </View>
          <Text style={styles.txt3}>
            {t('learningScreen.assignment.chooseFileDescription')}
          </Text>
          <View style={styles.viewBtn}>
            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => this.onSave()}
            >
              <Text style={styles.txtBtn}>
                {t('learningScreen.assignment.save')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => this.onSend()}
            >
              <Text style={styles.txtBtn}>
                {t('learningScreen.assignment.send')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ network }) => ({
  network,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Assignment));
