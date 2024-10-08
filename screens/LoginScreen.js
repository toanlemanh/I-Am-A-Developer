import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import DividerLine from '../components/DividerLine'
import FormBtn from '../components/FormBtn'
import FormInput from '../components/FormInput'
import SocialBtn from '../components/SocialBtn'
import { signInWithPassword } from '../config/firebase'

import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'
import { landStyles, styles } from '../styles/screenStyles/LoginScreenStyle'
import { AuthContext } from "../store/auth"
//1. Input handler 
//2. Connect firebase 

function LoginScreen({ navigation }) {
    const authContext = useContext(AuthContext)
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [style, setStyle] = useState(styles);
    useEffect(() => {
        Dimensions.addEventListener("change", ({ window: { width, height } }) => {
            if (width < height) {
                console.log("Pot");
                setStyle(styles);

            } else {

                setStyle({ ...styles, ...landStyles });
                console.log("land");
            }
        });
    }, []);

    function onEmailChangeHandler(email) {
        //   console.log(email)
        email = email.trim()
        setEmail(email)
    }
    function onPasswordChangeHandler(password) {
        password = password.trim()
        //  console.log(password)
        setPassword(password)
    }
    const onLoginPressed = async () => {
        // if good credentila => allow 
        if (email && password) {
            const userId = await signInWithPassword(email, password)
            if (userId) {
                console.log("UID", userId)
                const userName = await AsyncStorage.getItem("username" + userId)
                console.log("uname", userName)

                authContext.authenticate(userId, userName);

            }
        }
        else {
            // disable button 
            Alert.alert("Error", "Email/Password is required!")
        }
    }

    return (
        <ScrollView style={style.container}>
            <TouchableOpacity style={style.iconContainer} onPress={() => navigation.navigate('WelcomeScreen')}>
                <Ionicons
                    name={Platform.OS === 'ios' ? "chevron-back" : "chevron-back"}
                    size={24}
                    color="black"
                    style={style.icon} />
            </TouchableOpacity>

            <Animated.Text entering={ZoomIn.duration(600).delay(200).springify()} exiting={ZoomOut} style={style.title}>Welcome back! Glad to see you</Animated.Text>

            <View style={style.boxInput}>
                <FormInput placeholder={"Enter your email"} secureTextEntry={false} onCredentialChangeHandler={onEmailChangeHandler} value={email} />
                <FormInput placeholder={"Enter your password"} secureTextEntry={true} onCredentialChangeHandler={onPasswordChangeHandler} value={password} />
            </View>

            <FormBtn title={'Login'} onTap={onLoginPressed} />
            <DividerLine children={"Or Login with"} />

            <View style={style.socialBox}>
                <SocialBtn name={'logo-facebook'} size={30} color={"#4092FF"}></SocialBtn>
                <SocialBtn name={'logo-google'} size={30} color={"#F14336"}></SocialBtn>
                <SocialBtn name={'logo-apple'} size={30} color={"black"}></SocialBtn>
            </View>

            <View style={style.registerContainer}>
                <Text style={style.optionText}>
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={style.registerLink}>
                        Register Now
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView >
    )
}

export default LoginScreen;

