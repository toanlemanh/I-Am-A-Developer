import React, { useContext } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

import DividerLine from '../components/DividerLine';
import FormBtn from '../components/FormBtn';
import FormInput from '../components/FormInput';
import SocialBtn from '../components/SocialBtn';
import { signInWithPassword } from '../utils/firebase';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "./../context/auth"
import Animated, { FadeIn, ZoomIn, FadeOut, ZoomOut } from 'react-native-reanimated';

//1. Input handler 
//2. Connect firebase 

function LoginScreen({ navigation }) {
    const authContext = useContext(AuthContext)
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    function onEmailChangeHandler(email) {
        console.log(email);
        setEmail(email)
    }
    function onPasswordChangeHandler(password) {
        console.log(password);
        setPassword(password)
    }
    const onLoginPressed = async () => {
        console.log(email, password);
        // if good credentila => allow 
        if (email && password) {
            const token = await signInWithPassword(email, password);
            // console.log(token);
            authContext.authenticate(token);
        }
        else {
            // disable button 
            Alert.alert("Error", "Bad credential")
        }
    }

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('WelcomeScreen')}>
                <Ionicons
                    name={Platform.OS === 'ios' ? "chevron-back" : "chevron-back"}
                    size={24}
                    color="black"
                    style={styles.icon} />
            </TouchableOpacity>

            <Animated.Text entering={ZoomIn.duration(600).delay(200).springify()} exiting={ZoomOut} style={styles.title}>Welcome back! Glad to see you</Animated.Text>

            <View style={styles.boxInput}>
                <FormInput placeholder={"Enter your email"} secureTextEntry={false} onCredentialChangeHandler={onEmailChangeHandler} value={email} />
                <FormInput placeholder={"Enter your password"} secureTextEntry={true} onCredentialChangeHandler={onPasswordChangeHandler} value={password} />
            </View>

            <FormBtn title={'Login'} onTap={onLoginPressed} />
            <DividerLine children={"Or Login with"} />

            <View style={styles.socialBox}>
                <SocialBtn name={'logo-facebook'} size={30} color={"#4092FF"}></SocialBtn>
                <SocialBtn name={'logo-google'} size={30} color={"#F14336"}></SocialBtn>
                <SocialBtn name={'logo-apple'} size={30} color={"black"}></SocialBtn>
            </View>

            <View style={styles.registerContainer}>
                <Text style={{ fontSize: 16 }}>
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={styles.registerLink}>
                        Register Now
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView >
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
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
    },

    socialBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    registerContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    registerLink: {
        fontWeight: 'bold',
        color: '#EB9F4A',
        fontSize: 16,
    },
})