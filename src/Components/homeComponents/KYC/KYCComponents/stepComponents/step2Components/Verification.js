import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import api from '../../../../../../Services/ApiServices'

import Token from './../../../../../../utils/token';
import CustomerRegistrationId from './../../../../../../utils/customerRegistrationId';

const Starter5 = ({type, data, next, prev, setUserData}) => {
  const [number, onChangeNumber] = React.useState(null);
  const [registrationData, setRegistrationData] = useState(null);

  const verifyOTP = useCallback(() => {
    // For Testing
    // setUserData({
    //   CustomerComplianceInformationId: 'fc52f654-abd8-48a8-99fb-459fb3e928fa',
    //   CustomerName: 'Test Tester',
    // });
    // CustomerRegistrationId.id = 'fc52f654-abd8-48a8-99fb-459fb3e928fa';
    // next(1);
    // return;

    const token = Token.token;
    if (!token) {
      Alert.alert('Error', 'Could not verify OTP');
      return;
    }

    console.log('registrationData, number:', registrationData, number);

    if (!registrationData || !number) return;

    const dataToSend = {...registrationData, ConfirmationCode: number};

    const config = {
      method: 'post',
      url:
        '/accountopeninghelper/VerifyCustomerRegistration',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        Cookie:
          '.AspNet.ApplicationCookie=Koo9yzAgu10WKdxNtw7N17G7LPuc16b7V472z6oOkd9Q372eyJcDUf-gwUIBWQDpsLwQOeNO_TDE6VtxLN31Qsymh8VI_5JjKcP8N990UGRXvXuiHMx0UObsWVOD6XG9dX76ikAOIsKh2gO7vudww9sLPtGN4uPmIrsaP3wLzDri2MYPxrLiNULV-CAkVX2YrSYzhftowl4tfUO4MBffRvJHavxNrrrcXpXQVe3PwQSj_W1HO4CBppBqW0txAQdHHTY23FBeFsZlimred6nMJjfeE0mCxImNY7yRdM9S6WYW2bSRbYMjELjZmZbo4b4d088r0-8ovBVC7BNhZ13BW3eEcVjRiO2025XyszvWLPAXtn8HlFpgod5tZNk68gnXzTVxMCC6Q_79vL38L2JoTCt4X5fgA79Ep4Ogjiisq7t1mRWCSf4AcuQKkJHMvFbGlXjkBVP_pOSEg4YuWqy_w8KLfLeMWuH-u3QwRt6EG2IbAgzELsxy6FT_PUiTB-vz6VtcIixj17AFm_14L8f14NtB9AhFFIH3JoSFbGkX6eZbsJC-nm06KDjHBQI9jmMSX7LOk0t3AVhyHBl2ZjeRbA',
      },
      data: JSON.stringify(dataToSend),
    };

    api(config)
      .then(function (response) {
        const {ErrorMessage, VerificationStatus, customer} = response.data;
        console.log('Verification:', response.data);

        if (!ErrorMessage && VerificationStatus) {
          CustomerRegistrationId.id = response.data.CustomerRegsitrationId;

          if (type === 'init') {
            setUserData({
              CustomerComplianceInformationId:
                response.data.CustomerRegsitrationId,
              CustomerName: data.CustomerName,
            });
            next();
          } else {
            if (!customer) {
              console.error('customer is not preseent in response');
              Alert.alert('An error occured');
              return;
            }

            const {RegistrationType, CustomerName} = customer;

            if (!RegistrationType || !CustomerName) {
              console.error(
                'Registration Type and Customer Name is not present in OTP verification response',
              );
              Alert.alert('An error occured');
            }

            setUserData({
              CustomerComplianceInformationId:
                response.data.CustomerRegsitrationId,
              CustomerName: CustomerName,
            });

            next(RegistrationType);
          }
        }
      })
      .catch(function (error) {
        console.dir(error);
      });
  }, [data, type, next, number, setUserData, registrationData]);

  const resendOTP = useCallback(() => {
    const token = Token.token;
    if (!token) {
      Alert.alert('Error', 'Could not resend OTP');
      return;
    }

    if (!registrationData) return;

    const config = {
      method: 'post',
      url:
        '/accountopeninghelper/ReGenerateOTP',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        Cookie:
          '.AspNet.ApplicationCookie=Koo9yzAgu10WKdxNtw7N17G7LPuc16b7V472z6oOkd9Q372eyJcDUf-gwUIBWQDpsLwQOeNO_TDE6VtxLN31Qsymh8VI_5JjKcP8N990UGRXvXuiHMx0UObsWVOD6XG9dX76ikAOIsKh2gO7vudww9sLPtGN4uPmIrsaP3wLzDri2MYPxrLiNULV-CAkVX2YrSYzhftowl4tfUO4MBffRvJHavxNrrrcXpXQVe3PwQSj_W1HO4CBppBqW0txAQdHHTY23FBeFsZlimred6nMJjfeE0mCxImNY7yRdM9S6WYW2bSRbYMjELjZmZbo4b4d088r0-8ovBVC7BNhZ13BW3eEcVjRiO2025XyszvWLPAXtn8HlFpgod5tZNk68gnXzTVxMCC6Q_79vL38L2JoTCt4X5fgA79Ep4Ogjiisq7t1mRWCSf4AcuQKkJHMvFbGlXjkBVP_pOSEg4YuWqy_w8KLfLeMWuH-u3QwRt6EG2IbAgzELsxy6FT_PUiTB-vz6VtcIixj17AFm_14L8f14NtB9AhFFIH3JoSFbGkX6eZbsJC-nm06KDjHBQI9jmMSX7LOk0t3AVhyHBl2ZjeRbA',
      },
      data: JSON.stringify(registrationData),
    };

    api(config)
      .then(function (response) {
        if (response.data) {
          Alert.alert('OTP resent');
        }
      })
      .catch(function (error) {
        console.dir(error);
      });
  }, [registrationData]);

  useEffect(() => {
    const token = Token.token;
    if (!token) {
      Alert.alert('Error', 'Could not send OTP code');
      return;
    }

    if (!data) {
      Alert.alert('Error', 'Could not send OTP code');
      return;
    }

    const config = {
      method: 'post',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        Cookie:
          '.AspNet.ApplicationCookie=Koo9yzAgu10WKdxNtw7N17G7LPuc16b7V472z6oOkd9Q372eyJcDUf-gwUIBWQDpsLwQOeNO_TDE6VtxLN31Qsymh8VI_5JjKcP8N990UGRXvXuiHMx0UObsWVOD6XG9dX76ikAOIsKh2gO7vudww9sLPtGN4uPmIrsaP3wLzDri2MYPxrLiNULV-CAkVX2YrSYzhftowl4tfUO4MBffRvJHavxNrrrcXpXQVe3PwQSj_W1HO4CBppBqW0txAQdHHTY23FBeFsZlimred6nMJjfeE0mCxImNY7yRdM9S6WYW2bSRbYMjELjZmZbo4b4d088r0-8ovBVC7BNhZ13BW3eEcVjRiO2025XyszvWLPAXtn8HlFpgod5tZNk68gnXzTVxMCC6Q_79vL38L2JoTCt4X5fgA79Ep4Ogjiisq7t1mRWCSf4AcuQKkJHMvFbGlXjkBVP_pOSEg4YuWqy_w8KLfLeMWuH-u3QwRt6EG2IbAgzELsxy6FT_PUiTB-vz6VtcIixj17AFm_14L8f14NtB9AhFFIH3JoSFbGkX6eZbsJC-nm06KDjHBQI9jmMSX7LOk0t3AVhyHBl2ZjeRbA',
      },
    };

    if (type === 'init') {
      config.url =
        '/accountopeninghelper/RequestCustomerRegistration';
      config.data = JSON.stringify(data);
    } else {
      config.url =
        '/accountopeninghelper/ContinueAccountOpening?SearchParameter=' +
        data;
    }

    console.log('Data to send for registartion:', data);

    api(config)
      .then(function (response) {
        const {ErrorMessage, VerificationToken} = response.data;

        console.log('Request OTP:', response.data);

        if (ErrorMessage) {
          Alert.alert('Error', ErrorMessage);
        } else if (VerificationToken) {
          setRegistrationData(response.data);
        }
      })
      .catch(function (error) {
        Alert.alert('Error', 'Could not send OTP code');
        console.dir(error);
      });
  }, [data, type]);

  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./../../../../../../assets/verification.png')}
        />

        <Text style={styles.signupText}>Verification Code</Text>
        <Text style={styles.signupText1}>
          Please enter OTP code sent to you via SMS
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter pin"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={() => verifyOTP()}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        <Pressable style={{marginTop: 10}} onPress={() => resendOTP()}>
          <Text style={styles.pressableText}>Resend</Text>
        </Pressable>

        <Pressable style={{marginTop: 10}} onPress={prev}>
          <Text style={styles.pressableText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 50,
    width: 200,
    textAlign: 'center',
    fontSize: 20,
  },

  logo: {
    marginTop: '15%',
    marginLeft: 65,
  },

  signupText: {
    color: 'black',
    marginTop: '5%',
    fontSize: 25,
    fontWeight: 'bold',
  },
  signupText1: {
    color: 'black',
    marginTop: 5,
    fontSize: 17,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
  },

  button: {
    backgroundColor: '#DFA00A',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '80%',
    marginBottom: 5,
    marginTop: 35,
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  pressableText: {
    fontWeight: 'bold',
    marginTop: '3%',
  },

  buttomImage: {
    position: 'absolute',
    left: '-40%',
    bottom: '-40%',
  },
});

export default Starter5;
