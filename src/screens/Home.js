import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import ImageSlider from '../Components/homeComponents/ImageSlider/ImageSlider';
import SearchComponent from '../Components/homeComponents/SearchBar/SearchComponent';
import Individual from '../Components/homeComponents/individualBox/Individual';
import OurProductsText from '../Components/homeComponents/ourProductsText/OurProductsText';
import KhataFew from '../Components/homeComponents/KhataTypes/KhataFew';
import KYCSteps from './KYCSteps';
import NetScreen from './NetScreen';
import SingleAppointment from './../Components/homeComponents/SingleAppointment';

const Home = (props) => {
  const {navigation} = props;
  const [key, setKey] = useState(new Date());
  console.log('Home');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setKey(new Date());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      <NetScreen />
      <View style={styles.container}>
        <SearchComponent
          continue={(id) => {
            navigation.navigate('KYCSteps', {
              item: {},
              type: 'continue',
              data: id,
            });
          }}
        />

        <SingleAppointment key={key} />

        <OurProductsText />
        <Individual />
        <KhataFew navigation={navigation} />

        <View style={{margin: 20}}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Home;
