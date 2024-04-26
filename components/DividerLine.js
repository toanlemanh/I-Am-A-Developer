import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function DividerLine({ children }) {
    return (
        <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{children}</Text>
            <View style={styles.dividerLine} />
        </View>
    )
}

export default DividerLine

const styles = StyleSheet.create({
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },

    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#d3d2d2',
    },

    dividerText: {
        marginHorizontal: 10,
        color: '#6A707C',
    },
});