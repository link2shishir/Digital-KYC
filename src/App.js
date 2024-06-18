import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {Buffer} from 'buffer';
global.Buffer = Buffer;
import {Provider} from 'react-redux';
import store from './redux/store';

import axios from 'axios'
import qs from 'qs';
import Token from './utils/token';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Feather';
const Stack = createStackNavigator();

import Starter1 from './screens/Starter1';
import Starter2 from './screens/Starter2';
import Starter3 from './screens/Starter3';
import Starter4 from './screens/Starter4';
import Terms from './screens/Terms';
import FAQ from './screens/FAQ';
import About from './screens/About';
import Policy from './screens/Policy'
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import Settings from './screens/Settings'
import LearnMore from './screens/Learnmore';
import KYCSteps from './screens/KYCSteps';

import NetInfo from '@react-native-community/netinfo';

const App = () => {
  useEffect(() => {
    const data = qs.stringify({
      Username: 'superadmin@digitalagenepal.com',
      Password: 'Satellite@123456',
      grant_type: 'password',
    });

    const config = {
      method: 'POST',
      url: 'https://apionline.digitalagenepal.com/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      data: data,
    };

    axios(config)
      .then((res) => {
        // console.log('Token res:', res.data)
        Token.state = res.data;
      })
      .catch(function (error) {
        console.log(error.response.data.error_description);
        Alert.alert(error.response.data.error_description);
      });
  }, []);

  useEffect(() => {
    // NetInfo.fetch().then((state) => {
    //   console.log('blank fetch:', state);
    //   console.log('Connection type', state.type);
    //   console.log('---------------------------------');
    // });

    // NetInfo.fetch('vpn').then((state) => {
    //   console.log('vpn fetch:', state);
    //   console.log('Connection type', state.type);
    //   console.log('---------------------------------');
    // });

    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('network state change:', state);
      console.log('Connection type', state.type);
      console.log('---------------------------------');
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Starter1">
          <Stack.Screen
            name="Starter1"
            options={{headerShown: false}}
            component={Starter1}
          />

          <Stack.Screen
            name="Starter2"
            options={{headerShown: false}}
            component={Starter2}
          />
          <Stack.Screen
            name="Starter3"
            options={{headerShown: false}}
            component={Starter3}
          />

          <Stack.Screen
            name="Starter4"
            options={{headerShown: false}}
            component={Starter4}
          />
 <Stack.Screen
            name="Terms"
            options={{headerShown: false}}
            component={Terms}
          />
          <Stack.Screen
            name="About"
            options={{headerShown: false}}
            component={About}
          />
          <Stack.Screen
            name="FAQ"
            options={{headerShown: false}}
            component={FAQ}
          />
          <Stack.Screen
            name="Policy"
            options={{headerShown: false}}
            component={Policy}
          />
           <Stack.Screen
            name="Settings"
            options={{headerShown: false}}
            component={Settings}
          />
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={Login}
          />

          <Stack.Screen
            name="Register"
            options={{headerShown: false}}
            component={Register}
          />

          <Stack.Screen
            name="Dashboard"
            options={{
              headerShown: true,
              title: 'Digital KYC',
              headerLeft: null,

              headerStyle: {
                backgroundColor: '#001370',
              },
              headerTintColor: '#fff',

              headerTitleStyle: {
                fontSize: 15,
                marginLeft: 125,
                fontWeight: '900',
              },

              headerRight: () => (
                <Icon
                  name={'bell'}
                  size={25}
                  color="white"
                  style={{
                    marginRight: 10,
                  }}></Icon>
              ),
            }}
            component={Dashboard}
          />

          <Stack.Screen
            name="LearnMore"
            options={{
              headerShown: true,
              title: 'Digital KYC',
              headerLeft: null,

              headerStyle: {
                backgroundColor: '#001370',
              },
              headerTintColor: '#fff',

              headerTitleStyle: {
                fontSize: 15,
                marginLeft: 125,
                fontWeight: '900',
              },

              headerRight: () => (
                <Icon
                  name={'bell'}
                  size={25}
                  color="white"
                  style={{
                    marginRight: 10,
                  }}></Icon>
              ),
            }}
            component={LearnMore}
          />

          <Stack.Screen
            name="KYCSteps"
            options={{
              headerShown: true,
              title: 'Digital KYC',
              headerLeft: null,

              headerStyle: {
                backgroundColor: '#001370',
              },
              headerTintColor: '#fff',

              headerTitleStyle: {
                fontSize: 15,
                marginLeft: 125,
                fontWeight: '900',
              },

              headerRight: () => (
                <Icon
                  name={'bell'}
                  size={25}
                  color="white"
                  style={{
                    marginRight: 10,
                  }}></Icon>
              ),
            }}
            component={KYCSteps}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
