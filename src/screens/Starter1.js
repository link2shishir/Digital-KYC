import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Colors from "../styles/Colors"

const Starter1 = ({navigation}) => {
  const handleSubmit = () => {
    navigation.navigate('Starter2');
  };

  const handleSkip = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View >
      <Image
        source={require('../assets/Path251.png')}
        style={styles.topImage}
      />
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />

        <Image
          style={styles.centerImage}
          source={require('../assets/starter1.png')}
        />

        <Text style={styles.signupText}>Signup into the application</Text>

        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSkip()}>
          <Text style={styles.pressableText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Image
        style={styles.buttomImage}
        source={require('../assets/Path250.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topImage: {
    position: 'relative',
    left: '55%',
    top: '-10%',
  },

  logo: {
    marginTop: '-27%',
    marginBottom: '15%',
  },

  signupText: {
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: '11%',

    fontSize: 18,

    marginLeft: 75,
    marginRight: 75,
  },

  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '80%',
    marginTop: 90,
  },

  buttonText: {
    fontSize: 18,
    color: Colors.buttonTextColor,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  pressableText: {
    fontWeight: 'bold',
    marginTop: 24,
  },

  buttomImage: {
    marginLeft: -110,
    marginTop: -20,
  },
});

export default Starter1;
