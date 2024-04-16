import React from 'react'
import { SafeAreaView, View, Text, ImageBackground, StyleSheet } from 'react-native'
import FormBtn from '../components/FormBtn'

function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView style={{}}>
            <View>
                <Text>I'm Developer</Text>

                <View style={styles.boxInput}>
                    <FormBtn title={'Login'} onTap={() => navigation.navigate('LoginScreen')}></FormBtn>
                    <FormBtn title={'Register'} onTap={() => navigation.navigate('RegisterScreen')}></FormBtn>
                </View>

                <ImageBackground
                    source={require('../assets/images/bg-welcome.png')}
                    resizeMode="cover"
                />
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    boxInput: {
        paddingHorizontal: 20,
    }
});
