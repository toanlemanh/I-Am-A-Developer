import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DividerLine from '../components/DividerLine';
import FormBtn from '../components/FormBtn';
import FormInput from '../components/FormInput';
import SocialBtn from '../components/SocialBtn';

function LoginScreen({ navigation }) {
    const onLoginPressed = () => {
        navigation.navigate('MainScreen');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer}>
                <Ionicons
                    name={Platform.OS === 'ios' ? "chevron-back" : "chevron-back"}
                    size={24}
                    color="black"
                    style={styles.icon} />

            </TouchableOpacity>

            <Text style={styles.title}>Welcome back! Glad to see you</Text>

            <View style={styles.boxInput}>
                <FormInput placeholder={"Enter your email"} secureTextEntry={false} />
                <FormInput placeholder={"Enter your password"} secureTextEntry={true} />
            </View>

            <FormBtn title={'Login'} onTap={onLoginPressed} />
            <DividerLine children={"Or Login with"} />

            <View style={styles.socialBox}>
                <SocialBtn name={'logo-facebook'} size={30} color={"#4092FF"}></SocialBtn>
                <SocialBtn name={'logo-google'} size={30} color={"#F14336"}></SocialBtn>
                <SocialBtn name={'logo-apple'} size={30} color={"black"}></SocialBtn>
            </View>

            <View style={styles.registerContainer}>
                <Text style={{ color: 'black' }}>
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerLink}>
                        Register Now
                    </Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    // Icon Box
    iconContainer: {
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 70,
        marginBottom: 20,
        backgroundColor: 'white',
    },

    icon: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        borderRadius: 10,
    },

    title: {
        color: '#77B29F',
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 10,
    },

    boxInput: {
        width: '100%',
        marginVertical: 20,
        backgroundColor: '#F7F8F9',
    },

    socialBox: {
        flexDirection: 'row',
    },

    registerContainer: {
        marginVertical: 20,
        flexDirection: 'row'
    },

    registerLink: {
        fontWeight: 'bold',
        color: '#EB9F4A',
    },
})
