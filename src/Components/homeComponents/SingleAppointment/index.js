import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

// packages
import moment from 'moment';

// components
import ZoomScreen from './../../../screens/ZoomScreen';
import ClockScreen from './../../homeComponents/KYC/KYCComponents/stepComponents/step5Components/ClockScreen';

// utils
import Token from './../../../utils/token';
import CustomerRegistrationId from '../../../utils/customerRegistrationId';
import api from '../../../Services/ApiServices';

function SingleAppointment() {
  const [meetingInfo, setMeetingInfo] = useState({});
  const [appoinetment, setAppoinement] = useState(null);

  console.log('SingleAppoinement');

  useEffect(() => {
    console.log('[SingleAppoinement] UseEffect');

    const token = Token.token;
    if (!token) return;

    const id = CustomerRegistrationId.id;
    // const id = 'CFCF09A9-E1DD-4BB1-99D7-039AD04430FC';
    if (!id) return;

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
        console.log('SingleAppoinement res:', response);

        const item = response.data.Appointments[0];

        if (!item) return;

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
            console.log('Appoinement info:', item);
            console.log('Meeting info:', data);

            setMeetingInfo({
              meetingNumber: data.id,
              password: data.encrypted_password,
              start: false,
            });
          })
          .catch(function (error) {
            console.dir(error);
          });

        const appoinetment = {
          id: item.Id,
          name: item.Name,
          status: item.AppointmentStatus,
          date: item.AppointmentDate,
          startTime: item.AppointmentStartTime,
          endTime: item.AppointmentEndTime,
          link: item.AppointmentLink,
        };

        console.log(appoinetment);

        setAppoinement(appoinetment);
      })
      .catch((error) => {
        console.log('SingleAppoinement error');
        console.dir(error);
      });
  }, []);

  if (appoinetment) {
    const date = moment(new Date()).utcOffset('+05:45');
    // .format('YYYY-MM-DD hh:mm:ss');

    const expirydate = moment(appoinetment.startTime).utcOffset('+05:45');
    // .format('YYYY-MM-DD hh:mm:ss');

    let diffr = moment.duration(moment(expirydate).diff(moment(date)));

    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());

    var d = hours * 60 * 60 + minutes * 60 + seconds;
    d = d <= 0 ? 0 : d;

    return (
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'column',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#f0f0f0',
          height: 205,
        }}>
        <ClockScreen
          startTime={d}
          startMeeting={() =>
            setMeetingInfo((oldData) => {
              return {
                ...oldData,
                start: true,
              };
            })
          }
        />
        <ZoomScreen meetingInfo={meetingInfo} />
      </View>
    );
  }

  return <></>;
}

export default SingleAppointment;
