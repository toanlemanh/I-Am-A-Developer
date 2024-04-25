import React from 'react';
import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FormBtn from '../components/FormBtn';

function WelcomeScreen({ navigation }) {
    const imageStyle = Platform.select({
        ios: styles.image,
        android: { ...styles.image, width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.6 }
    });

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>I'm a Developer</Text>
                </View>
                <View style={styles.btnBox}>
                    <FormBtn title={'Login'} onTap={() => navigation.navigate('LoginScreen')} />
                    <FormBtn title={'Register'} onTap={() => navigation.navigate('RegisterScreen')} />
                </View>
                {/* <Image
                    source={require('../assets/images/bg-welcome.jpg')}
                    resizeMode='cover'
                    style={imageStyle}
                /> */}
            </View>
        </SafeAreaView>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fde8cd',
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
        height: '60%',
    }
});