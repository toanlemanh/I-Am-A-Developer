import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Animated, {FadeInLeft} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
function SocialBtn({ name, size, color, onPress }) {

    return (
        <AnimatedTouchable entering={FadeInLeft.duration(400).delay(300).springify().damping(5)}
            style={styles.btnContainer}
            onPress={onPress}
        >
            <View style={styles.iconWrapper}>
                <Ionicons name={name} size={size} color={color} />
            </View>
        </AnimatedTouchable>
    )
}

export default SocialBtn;

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