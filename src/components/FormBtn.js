import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

function FormBtn({ title, onTap }) {
    return (
        <Pressable onPress={onTap} style={({ pressed }) => [
            {
                opacity: pressed ? 0.7 : 1 // Opacity changes on press
            },
            styles.button
        ]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

export default FormBtn;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#EB9F4A',
        paddingVertical: 20,
        borderRadius: 10,
    },

    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    }
});
