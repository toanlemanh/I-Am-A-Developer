import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

function SocialBtn({ name, size, color, onPress }) {
    return (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={onPress}
        >
            <View style={styles.iconWrapper}>
                <Ionicons name={name} size={size} color={color} />
            </View>
        </TouchableOpacity>
    )
}

export default SocialBtn

const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E8ECF4',
        borderRadius: 10,
        width: 100,
        height: 56,
        marginHorizontal: 4,
    },

    iconWrapper: {
        backgroundColor: 'transparent',
    }
});