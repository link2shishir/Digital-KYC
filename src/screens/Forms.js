import React, {useState} from 'react';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  color,
  ScrollView,
} from 'react-native';
import PlaneIcon from 'react-native-vector-icons/Ionicons';
import KnowMoreIcon from 'react-native-vector-icons/Foundation';
import Khata from '../Components/homeComponents/KhataTypes/Khata';
import KYCSteps from './KYCSteps';
import Individual from '../Components/homeComponents/individualBox/Individual';

const confirm = ({navigation}) => {
  const [screen, setScreen] = useState('home');

  return (
    <View style={styles.Container}>
      <ScrollView>
        <Individual />
        <Khata navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default confirm;
