import React, { useContext } from 'react';
import { Platform, Text, View, useWindowDimensions } from 'react-native';
import { styles } from "../Style/screenStyles/HomeScreenStyle";
import PercentageBar from '../components/ProgressBar';
import { COLOR } from '../constants/GlobalColor';
import { UserContext } from '../store/user-context';


export default function CharacterStatus() {
    const { width: windowWidth } = useWindowDimensions()
    const userContext = useContext(UserContext)
    const user = userContext.userState
    return (
        <View style={Platform.OS === 'ios' ? styles.allStatusContainer : [styles.allStatusContainer, { paddingBottom: 50 }]}>
            <View style={styles.statusContainer} >
                <Text style={styles.ageText}>  Happiness:</Text>
                <View style={styles.statusBarContainer}>
                    <PercentageBar
                        height={15}
                        backgroundColor='grey'
                        completedColor={COLOR.happinessColor}
                        percentage={user.status.happiness}
                        width={windowWidth / 2}
                    />
                </View>
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.ageText}>Appearance:</Text>
                <View style={styles.statusBarContainer}>
                    <PercentageBar
                        height={15}
                        backgroundColor='grey'
                        completedColor={COLOR.lookColor}
                        percentage={user.status.appearance}
                        width={windowWidth / 2}
                    />
                </View>
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.ageText}>         Health:</Text>
                <View style={styles.statusBarContainer}>
                    <PercentageBar
                        height={15}
                        backgroundColor='grey'
                        completedColor={COLOR.healthColor}
                        percentage={user.status.health}
                        width={windowWidth / 2}
                    />
                </View>
            </View>
        </View>
    )
}