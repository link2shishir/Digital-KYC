import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import step2Styles from '../step2Components/Step2.styles';
import colors from './../../../../../../styles/Colors';
import moment from 'moment';
import Token from './../../../../../../utils/token';
import api from '../../../../../../Services/ApiServices';

const timeList = [
  {hour: 10, time: '10:00 am'},
  {hour: 11, time: '11:00 am'},
  {hour: 12, time: '12:00 pm'},
  {hour: 13, time: '1:00 pm'},
  {hour: 14, time: '2:00 pm'},
  {hour: 15, time: '3:00 pm'},
  {hour: 16, time: '4:00 pm'},
  {hour: 17, time: '5:00 pm'},
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: timeList[0].hour,
      selectedStartDate: new Date(),
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  requestMeeting = () => {
    console.log('userDetail:', this.props.userDetail);

    const {
      CustomerComplianceInformationId,
      CustomerName,
    } = this.props.userDetail;

    if (!CustomerComplianceInformationId || !CustomerName) {
      Alert.alert('Please fill up the form properly first');
      return;
    }

    const token = Token.token;
    if (!token) {
      Alert.alert('NO Token');
      return;
    }

    const startTime = moment(new Date(this.state.selectedStartDate))
      .hours(this.state.startTime)
      .minutes(0)
      .seconds(0)
      .utcOffset('+05:45')
      .format('YYYY-MM-DD HH:MM:SS');
    const endTime = moment(new Date(this.state.selectedStartDate))
      .hours(this.state.startTime + 1)
      .minutes(0)
      .seconds(0)
      .utcOffset('+05:45')
      .format('YYYY-MM-DD HH:MM:SS');

    const data = {
      CustomerComplianceInformationId,
      Name: 'Meeting requested to open an account by ' + CustomerName + '.',
      BookingDate: moment(this.state.selectedStartDate)
        .utcOffset('+05:45')
        .format('MM/DD/YYYY'),
      BookingStartTime: startTime,
      BookingEndTime: endTime,
    };

    console.log('Booking Data:', data);

    const config = {
      method: 'post',
      url:
        '/bookingsetup/CreateBookingSetup',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    api(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        Alert.alert('Meeting request sent');
        this.props.goBack();
      })
      .catch(function (error) {
        console.dir(error);
        Alert.alert('Could not send meeting request');
      });
  };

  render() {
    return (
      <View style={{marginBottom: 20, marginTop: 5,marginLeft:-17,marginRight:-17}}>
        <View style={step2Styles.textContainer1}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Date and Time selection
          </Text>
          <View style={styles.container}>
            <CalendarPicker
              onDateChange={this.onDateChange}
              selectedDayColor="#001370"
              selectedDayTextColor="#fff"
            />

            <View style={styles.timeContainer}>
              {timeList.map((time) => (
                <Pressable
                  key={time.hour}
                  onPress={() => this.setState({startTime: time.hour})}>
                  <Text
                    style={[
                      styles.time,
                      this.state.startTime === time.hour
                        ? styles.activeTime
                        : {},
                    ]}>
                    {time.time}
                  </Text>
                </Pressable>
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={this.requestMeeting}>
              <Text>Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button1}
              onPress={this.props.goBack}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  date: {
    marginTop: 20,
    marginLeft: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#dfa00a',
    borderRadius: 20,
    marginTop: 40,
    padding: 15,
    marginBottom: 20,
    marginLeft: 35,
    marginRight: 35,
    justifyContent: 'center',
  },

  timeContainer: {
    marginTop: 10,
    paddingTop: 10,

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',

    borderTopWidth: 2,
    borderTopColor: '#dfa00a',
  },
  time: {
    width: 80,
    paddingVertical: 4,
    paddingHorizontal: 7,

    color: 'black',
    textAlign: 'center',

    marginVertical: 5,

    borderRadius: 15,
  },
  activeTime: {
    color: 'white',
    backgroundColor: colors.primary,
  },

  button1: {
    fontWeight: 'bold',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
