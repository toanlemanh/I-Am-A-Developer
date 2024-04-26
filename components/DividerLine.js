import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../Style/componentStyle/DividerStyle'
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
