import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import Colors from "../styles/Colors"

const Starter2 = ({navigation}) => {
    const handleSubmit = () => {
        navigation.navigate('Starter3')
        
    }

    const handleSkip = () => {
        navigation.navigate('Dashboard');
      };

    return (
        <View style = {styles.container}>
            <Image 
                style={styles.logoText}
                source = {require('../assets/logo.png')}

            />
            <Image 
            style = {styles.image}
            source = {require('../assets/starter2.png')}
            />
            <Text style = {styles.text}>Choose account type and add details</Text>
            <TouchableOpacity
            style = {styles.button}
            onPress = {() => handleSubmit()}
            >
                <Text style = {styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress = {() => handleSkip()}
            >
                <Text style = {styles.pressableText}>Skip</Text>
            </TouchableOpacity>

            <Image 
                style={styles.lastImage}
                source = {require('../assets/Path251.png')}

            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoText: {
        marginTop: 67,
       marginLeft:39,
       marginRight:12
    },

    image: {
        marginTop: 72,
        marginLeft:69,
        marginRight:68.2
    },

    text: {
        fontWeight: 'bold',
        color: Colors.text,
        marginTop: 96,
        marginLeft:33,
        marginRight:32,
       
        fontSize:18
    },

    button: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
         paddingVertical: 10,
         paddingHorizontal: 12,
        width: '80%',
        marginTop:70
    },

    buttonText: {
        fontSize: 18,
        color: Colors.buttonTextColor,
        fontWeight: "bold",
        alignSelf: "center"
    },

    pressableText: {
        fontWeight: 'bold',
        marginTop:24,
       
    },
    lastImage:{
        marginLeft: 350,
        marginTop: -40,
        
    }
})

export default Starter2
