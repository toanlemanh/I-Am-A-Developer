import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native'
import FormBtn from '../components/FormBtn'

function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>I'm a Developer</Text>
                </View>

                <View style={styles.btnBox}>
                    <FormBtn title={'Login'} onTap={() => navigation.navigate('LoginScreen')}></FormBtn>
                    <FormBtn title={'Register'} onTap={() => navigation.navigate('RegisterScreen')}></FormBtn>
                </View>

                <Image
                    source={require('../assets/images/bg-welcome.png')}
                    resizeMode='cover'
                    style={styles.image}
                />
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    textBox: {
        marginVertical: 40,
        alignItems: 'center',
    },

    text: {
        fontSize: 40,
        color: '#77B29F',
        fontWeight: '700',
    },

    btnBox: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },

    image: {
        width: "100%",
        height: '50%',
    }
});