import React, {useState} from 'react';
import {StyleSheet, View, Text, Switch, TouchableOpacity} from 'react-native';

const App = ({navigation}) => {
  
  return (
    <View style={styles.container}>
    
      <TouchableOpacity
       onPress={() =>
            navigation.navigate('FAQ')
          }>
        <View style={styles.item5}>
          <Text style={styles.text}>FAQ</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
       onPress={() =>
            navigation.navigate('About')
          }>
        <View style={styles.item6}>
          <Text style={styles.text}>About</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
       onPress={() =>
            navigation.navigate('Policy')
          }>
        <View style={styles.item7}>
          <Text style={styles.text}>Policy</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() =>
            navigation.navigate('Terms')
          }>
        <View style={styles.item8}>
          <Text style={styles.text}>Terms and condition</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 1,
    lineHeight: 100,
  },
  text: {
    fontWeight: 'bold',
    marginTop: 25,
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 15,
  },
  item1: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  item2: {
    backgroundColor: '#F0F8FF',
    flexDirection: 'row',
  },
  item3: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  item4: {
    backgroundColor: '#F0F8FF',
    flexDirection: 'row',
  },
  item5: {
    backgroundColor: '#FFF',
  },
  item6: {
    backgroundColor: '#F0F8FF',
  },
  item7: {
    backgroundColor: '#FFF',
  },
  item8: {
    backgroundColor: '#F0F8FF',
  },
});
export default App;
