import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  Pressable,
} from 'react-native';
import styles from '../Components/homeComponents/KYC/KYCSteps.styles';

import step2Styles from '../Components/homeComponents/KYC/KYCComponents/stepComponents/step2Components/Step2.styles';

import Token from './../utils/token';
import CustomerRegistrationId from './../utils/customerRegistrationId';
import api from '../Services/ApiServices'
import moment from 'moment';

import ZoomScreen from './ZoomScreen';
import ClockScreen from '../Components/homeComponents/KYC/KYCComponents/stepComponents/step5Components/ClockScreen';

class Schedule extends React.Component {
  constructor() {
    super();
    this.state = {
      fetching: true,
      bookingList: [],
      appointments: [],
      error: null,
      meetingInfo: {},
    };
  }

  componentDidMount() {
    const token = Token.token;
    if (!token) {
      Alert.alert('No Token');
      this.setState({
        fetching: false,
        bookingList: [],
        error: 'No Token',
      });
      return;
    }

    const id = CustomerRegistrationId.id;
    // const id = 'CFCF09A9-E1DD-4BB1-99D7-039AD04430FC';
    if (!id) {
      this.setState({
        fetching: false,
        bookingList: [],
        appointments: [],
        error: 'Please register first',
      });
      return;
    }

    const config = {
      method: 'get',
      url:
        '/bookingsetup/GetAppointmentProfileById?CustomerRegistrationId=' +
        id,
      headers: {
        Authorization: token,
      },
    };

    api(config)
      .then((response) => {
        const {data} = response;

        const bookingList = data.BookingList.map((item) => ({
          id: item.Id,
          name: item.Name,
          status: item.BookingStatus,
          date: item.BookingDate,
          startTime: item.BookingStartTime,
          endTime: item.BookingEndTime,
        }));

        const appointments = data.Appointments.map((item) => {
          const config = {
            method: 'post',
            url:
              '/appointmentsetup/GetMeetingInformation?Id=' +
              item.Id,
            headers: {
              Authorization: token,
            },
            data: '',
          };

          api(config)
            .then(({data}) => {
              this.setState({
                meetingInfo: {
                  [item.Id]: {
                    meetingNumber: data.id,
                    password: data.encrypted_password,
                    start: false,
                  },
                },
              });
            })
            .catch(function (error) {
              console.dir(error);
            });

          return {
            id: item.Id,
            name: item.Name,
            status: item.AppointmentStatus,
            date: item.AppointmentDate,
            startTime: item.AppointmentStartTime,
            endTime: item.AppointmentEndTime,
          };
        });

        console.log('appointments:', appointments);

        this.setState({
          fetching: false,
          bookingList,
          appointments,
          error: null,
        });
      })
      .catch((error) => {
        console.dir(error);
        this.setState({
          fetching: false,
          bookingList: [],
          error: 'Could not fetch data',
        });
      });
  }

  render() {
    return (
      <ScrollView
        style={{
          marginBottom: 50,
          marginTop: 2,
          marginLeft: 5,
          marginRight: 10,
        }}>
        <View style={step2Styles.textContainer}>
          <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
            Booking History
          </Text>
        </View>

        {this.state.fetching ? (
          <View>
            <Text style={msgStyles.text}>Fetching</Text>
          </View>
        ) : this.state.error ? (
          <View>
            <Text style={[msgStyles.text, msgStyles.error]}>
              {this.state.error}
            </Text>
          </View>
        ) : this.state.bookingList.length === 0 ? (
          <View>
            <Text style={msgStyles.text}>No data</Text>
          </View>
        ) : (
          <ScrollView horizontal style={step2Styles.detailsContainer1}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{marginLeft: 5, color: '#FF6347'}}>Status</Text>
              {this.state.bookingList.map((item) => {
                if (item.status) {
                  return (
                    <View
                      key={item.id}
                      style={{
                        backgroundColor: 'green',
                        width: 65,
                        height: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderBottomLeftRadius: 5,
                        // borderBottomRightRadius: 5,
                        borderRadius: 50,
                        marginTop: 5,
                        flex: 1,
                      }}>
                      <Text style={{color: 'white'}}>Active</Text>
                    </View>
                  );
                } else {
                  return (
                    <View
                      key={item.id}
                      style={{
                        backgroundColor: 'red',
                        width: 65,
                        height: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderBottomLeftRadius: 5,
                        // borderBottomRightRadius: 5,
                        borderRadius: 50,
                        marginTop: 5,
                        flex: 1,
                      }}>
                      <Text style={{color: 'white'}}>Inactive</Text>
                    </View>
                  );
                }
              })}
            </View>

            {/* <View style={{flexDirection: 'column'}}>
              <Text style={{marginLeft: 15, color: '#FF6347'}}>Name</Text>
              {this.state.bookingList.map((item) => (
                <Text
                  key={item.id}
                  style={{
                    marginLeft: 15,
                    color: 'black',
                    marginTop: 10,
                    height: 25,
                  }}>
                  Dinesh
                </Text>
              ))}
            </View> */}

            <View style={{flexDirection: 'column'}}>
              <Text style={{marginLeft: 15, color: '#FF6347'}}>
                Booked Date
              </Text>
              {this.state.bookingList.map((item) => {
                const date = new Date(item.date);
                return (
                  <Text
                    key={item.id}
                    style={{
                      marginLeft: 15,
                      color: 'black',
                      marginTop: 10,
                      height: 25,
                    }}>
                    {`${date.getFullYear()}/${
                      date.getMonth() + 1
                    }/${date.getDate()}`}
                  </Text>
                );
              })}
            </View>

            <View style={{flexDirection: 'column'}}>
              <Text style={{marginLeft: 20, color: '#FF6347'}}>
                Booked Time
              </Text>
              {this.state.bookingList.map((item) => {
                const start = new Date(item.startTime),
                  end = new Date(item.endTime);

                const startHours =
                    start.getHours() > 12
                      ? start.getHours() - 12
                      : start.getHours(),
                  endHours =
                    end.getHours() > 12 ? end.getHours() - 12 : end.getHours();

                const timeString = `${
                  startHours < 10 ? '0' + startHours : startHours
                }:${
                  start.getMinutes() < 10
                    ? '0' + start.getMinutes()
                    : start.getMinutes()
                } ${start.getHours() >= 12 ? 'PM' : 'AM'} - ${
                  endHours < 10 ? '0' + endHours : endHours
                }:${
                  end.getMinutes() < 10
                    ? '0' + end.getMinutes()
                    : end.getMinutes()
                } ${end.getHours() >= 12 ? 'PM' : 'AM'}`;

                return (
                  <Text
                    key={item.id}
                    style={{
                      marginLeft: 20,
                      color: 'black',
                      marginTop: 10,
                      height: 25,
                    }}>
                    {timeString}
                  </Text>
                );
              })}
            </View>
          </ScrollView>
        )}

        <View style={[step2Styles.textContainer, {marginTop: 100}]}>
          <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
            Appointments
          </Text>
        </View>

        {this.state.fetching ? (
          <View>
            <Text style={msgStyles.text}>Fetching</Text>
          </View>
        ) : this.state.error ? (
          <View>
            <Text style={[msgStyles.text, msgStyles.error]}>
              {this.state.error}
            </Text>
          </View>
        ) : this.state.appointments.length === 0 ? (
          <View>
            <Text style={msgStyles.text}>No data</Text>
          </View>
        ) : (
          <View
            style={{
              ...step2Styles.detailsContainer1,
              flexDirection: 'column',
              flex: 1,
            }}>
            {this.state.appointments.map((item) => {
              const date = moment(new Date())
                .utcOffset('+05:45')
                .format('YYYY-MM-DD hh:mm:ss');

              const expirydate = moment(item.startTime)
                .utcOffset('+05:45')
                .format('YYYY-MM-DD hh:mm:ss');

              // console.log({
              //   name: item.name,
              //   start: date,
              //   end: expirydate,
              // });

              let diffr = moment.duration(
                moment(expirydate).diff(moment(date)),
              );

              var hours = parseInt(diffr.asHours());
              var minutes = parseInt(diffr.minutes());
              var seconds = parseInt(diffr.seconds());

              var d = hours * 60 * 60 + minutes * 60 + seconds;
              d = d <= 0 ? 0 : d;

              return (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: 'white',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#f0f0f0',
                    height: 205,
                  }}>
                  {/* <ClockScreen
                    startTime={d}
                    startMeeting={() =>
                      this.setState({
                        meetingStart: {
                          [item.key]: true,
                        },
                      })
                    }
                  />
                  <ZoomScreen
                    meetingInfo={{
                      meetingNumber: '75684072996',
                      password: '5RE604',
                    }}
                    meetingStart={this.state.meetingStart[item.key]}
                  /> */}

                  <ClockScreen
                    startTime={d}
                    startMeeting={() => {
                      this.setState((oldState) => {
                        const meetingInfo = {
                          ...oldState.meetingInfo,
                          [item.id]: {
                            ...oldState.meetingInfo[item.id],
                            start: true,
                          },
                        };

                        return {meetingInfo};
                      });
                    }}
                  />

                  <ZoomScreen meetingInfo={this.state.meetingInfo[item.id]} />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    );
  }
}

const msgStyles = StyleSheet.create({
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  error: {
    color: 'red',
  },
});

export default Schedule;
