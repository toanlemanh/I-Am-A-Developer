import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/auth';
import { postUserId } from '../context/axios';
import { UserContext } from '../context/user-context';

import { styles } from "../Style/screenStyles/HomeScreenStyle";

import CharacterStatus from '../components/CharacterStatus';
import CustomAvatar from '../components/CustomAvatar';
import PercentageBar from '../components/ProgressBar';
import RandomPopup from '../components/eventsPopup/RandomPopup';


export default function HomeScreen() {
    const [userName, setUserName] = useState("Tom")
    const authContext = useContext(AuthContext);
    const userId = authContext.userId;
    const userContext = useContext(UserContext);
    const navigation = useNavigation();
    const user = userContext.userState

    React.useEffect(() => {
        async function loadUserName() {
            //    console.log("auth",authContext.userName);
            //    console.log("auth",userContext.userState);
            // post here with updated user name and other user state
            postUserId(userId, userContext.userState);
            setUserName(await AsyncStorage.getItem(userId));
        }
        loadUserName();
    }, [userId])
    const characterName = userName;

    const [lifeStage, setLifeStage] = useState('Infant');

    useEffect(() => {
        if (user.character.age <= 1) {
            setLifeStage("Infant")
        } else if (user.character.age <= 9) {
            setLifeStage("Kid")
        } else if (user.character.age <= 19) {
            setLifeStage("Teenager")
        } else setLifeStage("Adult")

    }, [user.character.age]);


    // Start progressing and status draining
    useEffect(() => {
        userContext.drainStatus()
        userContext.startProgress()
    }, []);


    const [modalVisible, setModalVisible] = useState(false);
    function handleAgePress() {
        userContext.updateCharacterAge(1)

    }

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Level progress bar*/}
            <PercentageBar
                width={'100%'}
                height={12}
                backgroundColor={'#E0E9F2'}
                completedColor={'#EB9F4A'}
                percentage={user.progress}
            />

            {/* Top container will contain avatar, age and balance*/}
            <View style={styles.topContainer} >
                <View style={styles.userInfo}>
                    <View >
                        <CustomAvatar width={54} height={54} />
                        <View style={styles.level}>
                            <Text>{user.character.age}</Text>
                        </View>
                    </View>
                    <View style={styles.characterNameContainer}>
                        <Text style={styles.stageStyle}> {lifeStage}</Text>
                        <Text style={styles.username}>{characterName}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.balance}>Balance:</Text>
                    <Text style={styles.money}>${user.character.money}</Text>
                </View>
            </View>

            {/* Container of user's events and different age */}
            <View style={styles.eventsContainer}>
                {/* Replace to Coding activities */}
            </View>

            {/* Container of navigators and the status progress bar */}
            <View style={styles.underhalf}>
                <View style={styles.utility}>
                    <Pressable style={({ pressed }) => pressed && styles.pressed} >
                        <View style={styles.iconNavigateStyle}>
                            <MaterialIcons name="work" size={24} color="black" onPress={() => {
                                navigation.navigate('Occupation')
                            }} />
                            <Text style={styles.navigateText}>Occupation</Text>
                        </View>
                    </Pressable>

                    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={() => {
                        navigation.navigate('Assets')
                    }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="sack" size={24} color="black" />
                            <Text style={styles.navigateText}>Assets</Text>
                        </View>
                    </Pressable>
                    <View style={styles.outterContainer}>
                        <Pressable
                            style={({ pressed }) => pressed && styles.pressed}
                            onPress={handleAgePress}
                        >
                            <View style={styles.buttonContainer}>
                                <Text style={styles.incrementAge}>+</Text>
                                <Text style={styles.incrementAge}>Age</Text>
                            </View>
                        </Pressable >
                        {/* random modal component */}
                        <RandomPopup modalVisible={modalVisible} closeModal={closeModal} />
                    </View>

                    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={() => {
                        navigation.navigate('Relationship');
                    }}>
                        <View style={styles.iconNavigateStyle}>
                            <AntDesign name="heart" size={24} color="black" />
                            <Text style={styles.navigateText}>Relationship</Text>
                        </View>
                    </Pressable>

                    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={() => navigation.navigate("SchoolScreen")}>
                        <View style={styles.iconNavigateStyle}>
                            <Ionicons name="school" size={24} color="black" />
                            <Text style={styles.navigateText}>Education</Text>
                        </View>
                    </Pressable>
                </View>
                {/*  Character status bars */}
                <CharacterStatus />
            </View>
        </View>
    )
}

