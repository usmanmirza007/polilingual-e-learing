import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const isIos = Platform.OS === 'ios';
class CountDown extends React.Component {
  timeCountDown = '00:00:00';

  componentDidMount() {
    this.startCountDown();
  }

  startCountDown() {
    const { duration, callBack } = this.props;
    let timer = duration;
    if (isIos) {
      BackgroundTimer.start();
      this.countDownTimer = setInterval(() => {
        let h = String(Math.floor(timer / 3600));
        let m = String(Math.floor(timer / 60) % 60);
        let s = String(timer % 60);
        if (Number(h) < 10) h = `0${h}`;
        if (Number(m) < 10) m = `0${m}`;
        if (Number(s) < 10) s = `0${s}`;
        if (h === '00') {
          this.timeCountDown = `${m}:${s}`;
        } else {
          this.timeCountDown = `${h}:${m}:${s}`;
        }
        this.forceUpdate();
        timer -= 1;
        if (timer < 0) {
          clearInterval(this.countDownTimer);
          BackgroundTimer.stop();
          timer = 0;
          callBack();
        }
      }, 1000);
    } else {
      this.countDownTimer = BackgroundTimer.setInterval(() => {
        let h = String(Math.floor(timer / 3600));
        let m = String(Math.floor(timer / 60) % 60);
        let s = String(timer % 60);
        if (Number(h) < 10) h = `0${h}`;
        if (Number(m) < 10) m = `0${m}`;
        if (Number(s) < 10) s = `0${s}`;
        // return h + ":" + m + ":" + s;
        if (h === '00') {
          this.timeCountDown = `${m}:${s}`;
        } else {
          this.timeCountDown = `${h}:${m}:${s}`;
        }
        this.forceUpdate();
        timer -= 1;
        if (timer < 0) {
          if (this.countDownTimer)
            BackgroundTimer.clearInterval(this.countDownTimer);
          timer = 0;
          callBack();
        }
      }, 1000);
    }
  }

  componentDidUpdate(prevProps) {
    const { startDate } = this.props;
    if (startDate && prevProps.startDate !== startDate) {
      if (this.countDownTimer) {
        if (isIos) {
          clearInterval(this.countDownTimer);
          BackgroundTimer.stop();
        } else BackgroundTimer.clearInterval(this.countDownTimer);
      }
      this.startCountDown();
    }
  }

  componentWillUnmount() {
    if (this.countDownTimer) {
      if (isIos) {
        clearInterval(this.countDownTimer);
        BackgroundTimer.stop();
      } else BackgroundTimer.clearInterval(this.countDownTimer);
    }
  }

  render() {
    const { textStyle } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[styles.txtCountDown, textStyle]}>
          {this.timeCountDown}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: '#000',
  },
  txtCountDown: {
    color: 'red',
    fontWeight: '500',
  },
});

export default CountDown;
