import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

function FormInput({ placeholder, secureTextEntry }) {
    return (
        <TextInput
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
        />
    )
}

export default FormInput

const styles = StyleSheet.create({

    input: {
        color: '#8391A1',
        borderColor: '#E8ECF4',
        borderWidth: 1,
        borderRadius: 10,

        marginBottom: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});