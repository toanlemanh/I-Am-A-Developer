import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import Animated, { BounceIn } from 'react-native-reanimated';
function FormInput({ placeholder, secureTextEntry, value, onCredentialChangeHandler }) {
    return (
        <Animated.View entering={BounceIn.duration(500).delay(100).springify()}>
            <TextInput
                value={value}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                onChangeText={onCredentialChangeHandler}
            />
        </Animated.View>

    )
}

export default FormInput;

const styles = StyleSheet.create({

    input: {
        color: '#8391A1',
        backgroundColor: '#F7F8F9',
        borderColor: '#E8ECF4',
        borderWidth: 1,
        borderRadius: 10,

        fontSize: 16,
        marginBottom: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});