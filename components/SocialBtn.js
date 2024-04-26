import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import { styles } from '../Style/componentStyle/SocialBtnStyle';
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

