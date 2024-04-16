import React from 'react'
import { SafeAreaView, View } from 'react-native/types'
import FormBtn from '../components/FormBtn'

function WelcomeScreen() {
    return (
        <SafeAreaView>
            <View>
                <Text>I'm Developer</Text>

                <FormBtn>Login</FormBtn>
                <FormBtn>Register</FormBtn>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen
