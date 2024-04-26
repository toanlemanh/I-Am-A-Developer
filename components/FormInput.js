import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import Animated, { BounceIn } from 'react-native-reanimated';
import { styles } from '../Style/componentStyle/FormInputStyle';
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

