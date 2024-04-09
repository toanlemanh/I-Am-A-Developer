import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import SocialButton from '../../components/SocialButton';
// import { AuthContext } from '../navigation/AuthProvider';

const Signup = ({ navigation }) => {
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    // const { register } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello! Register to get started</Text>

            <FormInput
                labelValue={user}
                onChangeText={(userName) => setUser(userName)}
                placeholderText="User Name"
                // iconType="user"
                // keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                // iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                // iconType="lock"
                secureTextEntry={true}
            />

            <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                placeholderText="Confirm Password"
                // iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="Sign Up"
            // onPress={() => register(email, password)}
            />


            <Text style={styles.colorTextPrivate}>Or register with</Text>


            {Platform.OS === 'android' ? (
                <View style={styles.socialButton}>
                    <SocialButton
                        // buttonTitle="Sign Up with Facebook"
                        btnType="facebook"
                        color="#4867aa"
                        backgroundColor="#e6eaf4"
                        onPress={() => { }}
                    />

                    <SocialButton
                        // buttonTitle="Sign Up with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => { }}
                    />
                </View>
            ) : null}

            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Already have an account?
                    <Text style={{ color: '#35C2C1' }}> Sign In</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        fontWeight: 'bold'
        // color: '#051d5f',
    },
    socialButton: {
        flexDirection: 'row',
        padding: 20,

    },
    navButton: {
        marginTop: 60,
    },
    navButtonText: {
        fontSize: 15,
        fontWeight: '300',
        // color: '#2e64e5',  
    },

    colorTextPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: '400',
        color: 'grey',
    },
});
