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

const Learnmore = ({route, navigation}) => {
  const {item} = route.params;

  return (
    <View style={styles.Container}>
      <View>
        <Image
          source={require('./../assets/featureImg.png')}
          style={styles.Image}
        />
      </View>

      <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 30}}>
        <Text
          style={{
            color: '#dfa00a',
            fontWeight: 'bold',
            fontSize: 14,
            marginTop: 2,
          }}>
          {item.Name}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#dfa00a',
            borderRadius: 50,
            padding: 3,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
            marginLeft: 40,
            flex: 3,
          }}
          onPress={() =>
            navigation.navigate('KYCSteps', {item, type: 'init', data: null})
          }>
          <PlaneIcon
            name="paper-plane-outline"
            size={15}
            color="white"
            style={{paddingRight: 2}}>
            {' '}
          </PlaneIcon>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Apply</Text>
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView>
          <Text style={{marginRight: 15, marginLeft: 30, marginTop: 15}}>
            {item.DetailDescription}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Learnmore;
