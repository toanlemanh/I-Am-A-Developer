import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomAvatar from '../components/CustomAvatar';
import PercentageBar from '../components/ProgressBar';
import RandomPopup from '../components/eventsPopup/RandomPopup';
import data from '../data/userData.json';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/user-context';
import { postUserId } from '../context/axios';


export default function HomeScreen() {
    const [userName, setUserName] = useState("Tom")
    const authContext = useContext(AuthContext);
    const userId = authContext.userId;
    const userContext = useContext(UserContext);
    const navigation = useNavigation();
    
    React.useEffect(() => {
        async function loadUserName () {
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

    let age = data.Info.age;
    const [ageLogs, setAgeLogs] = useState([
        {
            age: age,
            events:[`You are at the age of ${age}`]
        }
    ]);
  
   
  
    const [getAge,setAge] =useState(age);

    useEffect(() => {
        if (getAge <= 1) {
            setLifeStage("Infant")
        } else if (getAge <= 9) {
            setLifeStage("Kid")
        } else if (getAge <= 19) {
            setLifeStage("Teenager")
        } else setLifeStage("Adult")

    }, [getAge]);
   
    

    const [modalVisible, setModalVisible] = useState(false);
    function handleAgePress() {
        const newAge = getAge + 1;
        setAge(newAge);
        // Add a new object to the ageLogs array
        setAgeLogs(prevLogs => [
            ...prevLogs,
            { age: newAge, events: [
                `You are at the age of ${newAge}`,
                `You are at the age of ${newAge}`
            ] }
        ]);
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    const eventData = data.userAgeLogs
    function renderItem({item}) {
        return (
            <View style={styles.eventContainer} >
                <Text style={styles.ageText}> Age: {item.age} </Text>
                {item.events.map((event, id) => <Text key={id} style={styles.eventText}>{event}</Text>)}

            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Level progress bar*/}
            <PercentageBar
                width={'100%'}
                height={12}
                backgroundColor={'#E0E9F2'}
                completedColor={'#EB9F4A'}
                percentage={data.Info.progress}
            />

            {/* Top container will contain avatar, age and balance*/}
            <View style={styles.topContainer} >
                <View style={styles.userInfo}>
                    <View >
                        <CustomAvatar width={54} height={54} />
                        <View style={styles.level}>
                            <Text>{getAge}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 17 }}>
                        <Text style={styles.stageStyle}> {lifeStage}</Text>
                        <Text style={styles.username}>{characterName}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ fontWeight: 300 }}>Balance:</Text>
                    <Text style={styles.money}>${data.Info.money}</Text>
                </View>
            </View>

            {/* Container of user's events and different age */}
            <View style={styles.eventsContainer}>
                <FlatList
                    data={ageLogs}
                    renderItem={renderItem}
                    keyExtractor={item => item.age}
                />
            </View>

            {/* Container of navigators and the status progress bar */}
            <View style={styles.underhalf}>
                <View style={styles.utility}>
                    <Pressable style={({ pressed }) => pressed && styles.pressed} >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name="work" size={24} color="black" onPress={() => {
                                navigation.navigate('Occupation')
                            }} />
                            <Text style={{ fontSize: 10 }}>Occupation</Text>
                        </View>
                    </Pressable>

                    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={() => {
                        navigation.navigate('Assets')
                    }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="sack" size={24} color="black" />
                            <Text style={{ fontSize: 10 }}>Assets</Text>
                        </View>
                    </Pressable>
                    <View style={styles.outterContainer}>
                        <Pressable
                            style={({ pressed }) => pressed && styles.pressed}
                            onPress={handleAgePress} 
                        >
                            <View style={styles.buttonContainer}>
                                <Text style={{ fontWeight: '600', color: 'white', fontSize: 24 }}>+</Text>
                                <Text style={{ fontWeight: '500', color: 'white', fontSize: 20 }}>Age</Text>
                            </View>
                        </Pressable >
                        {/* random modal component */}
                        <RandomPopup modalVisible={modalVisible} closeModal={closeModal} />
                    </View>

                    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={() => {
                        navigation.navigate('Relationship');
                    }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <AntDesign name="heart" size={24} color="black" />
                            <Text style={{ fontSize: 10 }}>Relationship</Text>
                        </View>
                    </Pressable>

                    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={() => navigation.navigate("SchoolScreen")}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="school" size={24} color="black" />
                            <Text style={{ fontSize: 10 }}>Education</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={Platform.OS === 'ios' ? styles.allStatusContainer : [styles.allStatusContainer, { paddingBottom: 50 }]}>
                    <View style={styles.statusContainer} >
                        <Text style={styles.ageText}>Happiness:</Text>
                        <PercentageBar
                            height={15}
                            backgroundColor='grey'
                            completedColor="#009A34"
                            percentage={data.Condition.Happiness}
                            width={200}
                        />
                    </View>
                    <View style={styles.statusContainer} >
                        <Text style={styles.ageText}>      Health:</Text>
                        <PercentageBar
                            height={15}
                            backgroundColor='grey'
                            completedColor="#EED817"
                            percentage={data.Condition.Health}
                            width={200}

                        />
                    </View>
                    <View style={styles.statusContainer} >
                        <Text style={styles.ageText}>      Look:</Text>
                        <PercentageBar
                            height={15}
                            backgroundColor='grey'
                            completedColor="#FD7C1F"
                            percentage={data.Condition.Looks}
                            width={200}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF1E7'
    },
    topContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: "100%",
        height: 55,
        backgroundColor: '#FFFFFF',
        marginTop: -11

    },
    underhalf: {
        backgroundColor: 'white',
        flex: 1

    },
    userInfo: {
        flexDirection: 'row',
        paddingLeft: 40

    },
    level: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'lightgrey',
        marginRight: -15,
        marginBottom: -15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        fontSize: 20,
        fontWeight: '700',
        color: '#083C4C',
    },
    money: {
        fontSize: 20,
        marginRight: 20,
        textAlign: 'center',
        fontWeight: '500',
        color: '#083C4C',
    },
    ageText: {
        color: 'darkblue',
        fontWeight: 'bold',
        fontSize: 16,
    },
    eventText: {
        fontSize: 12,
        fontWeight: '300',
    },
    eventContainer: {
        marginVertical: 20,
    },
    eventsContainer: {
        height: hp('55%'),
        paddingLeft: 15,
        // flex: 1,

    },
    allStatusContainer: {
        width: '100%',
        height: 205,
        justifyContent: 'center',

    },

    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statusText: {
        fontWeight: '300',
        color: 'darkblue'
    },
    stageStyle: {
        color: '#083C4C',
        fontSize: 13,
        fontWeight: '300'
    },
    utility: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: '#EB9F4A',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#2B9939',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    pressed: {
        opacity: 0.65
    },
    outterContainer: {
        width: 76,
        height: 76, borderRadius: 38, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
        elevation: 7,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})