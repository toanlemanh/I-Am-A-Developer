import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { getUserId } from "../api/axios";
import CharacterStatus from "../components/CharacterStatus";
import CustomAvatar from "../components/CustomAvatar";
import PercentageBar from "../components/ProgressBar";
import SelectionPopup from "../components/eventsPopup/SelectionPopup";
import { COLOR } from "../constants/GlobalColor";
import data from "../data/data.json";
import { AuthContext } from "../store/auth";
import { UserContext } from "../store/user-context";

import SettingPopup from "../components/eventsPopup/SettingPopup";
import { AVATARS } from "../constants/Avatars";
import { CONSTRAINTS } from "../constants/CharacterConstraints";
import { loadingStyle } from '../styles/componentStyles/LoadingStyle';
import { styles } from '../styles/screenStyles/HomeScreenStyle';

const AnimatedImage = Animated.createAnimatedComponent(Image);
export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  //const [userName, setUserName] = useState("Tom");
  const [currentKey, setCurrentKey] = useState();
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;
  const userContext = useContext(UserContext);
  const navigation = useNavigation();
  const user = userContext.userState;
  const [modalVisible, setModalVisible] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);
  const { height: windowHeight } = useWindowDimensions();
  const [fatalModal, setFatalModal] = useState(false);
  const [randomFatal, setRandomFatal] = useState(0);
  let progressId = "";
  React.useEffect(() => {
    async function loadUserName() {
      // load based on user Id
      if (userId) {
        // console.log("username: ", await AsyncStorage.getItem(userId));
        // setUserName(await AsyncStorage.getItem(userId));
        try {
          await getUserId(userId).then(({ key, current }) => {
            console.log("key current", key, current);
            setCurrentKey(key);
            AsyncStorage.setItem("key", key);
            userContext.updateUser(current);
          });
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
          userContext.loadProgress(userId);

        }
      }
    }
    loadUserName();
  }, [userId]);
  const [lifeStage, setLifeStage] = useState("Infant");
  useEffect(() => {
    if (user.character.age === CONSTRAINTS.age.legalAdult && !user.character.inShool && !user.character.inUniversity && user.character.occupation.salary === 0) {
      userContext.levelupAllEducation()
      user.character.money += 10000
      Alert.alert("Your parents gave you $10000. It's time to start working for your life!")
    }

  }, [user.character.age])
  useEffect(() => {
    progressId = userContext.startProgress();

    return () => {
      clearInterval(progressId);
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("progress" + userId, userContext?.progress.toString());
    //console.log("sucess set progress")
    if (userContext.progress > CONSTRAINTS.age.max) {
      userContext.updateProgress(-100);
      userContext.updateCharacterAge(1);
      updateAge();
    }
  }, [userContext.progress]);

  useEffect(() => {
    if (user.character.age <= CONSTRAINTS.age.infant) {
      setLifeStage("Infant");
    } else if (user.character.age <= CONSTRAINTS.age.kid) {
      setLifeStage("Kid");
    } else if (user.character.age <= CONSTRAINTS.age.teen) {
      setLifeStage("Teenager");
    } else if (user.character.age <= CONSTRAINTS.age.adult) {
      setLifeStage("Adult");
    } else setLifeStage("Old");
  }, [user.character.age]);

  //condition for modal to show when level-up (progress =100)
  useEffect(() => {
    if (userContext.progress >= CONSTRAINTS.age.max) {
      const eventsLength = data.newAgeEvents.data.length;
      const index = Math.floor(Math.random() * eventsLength);

      setRandomIndex(index);
      setModalVisible(true);
    }
  }, [userContext.progress]);
  useEffect(() => {
    if (!user.isAlive) {
      Alert.alert("You are Dead!")
      navigation.navigate('EndGameScreen')
    }
  }, [user.isAlive])


  useEffect(() => {

    const interval = setInterval(() => {
      const eventsLength = data.fatalEvents.data.length;
      const index = Math.floor(Math.random() * eventsLength);
      setRandomFatal(index);
      if (user.isAlive) {
        setFatalModal(true);
        console.log("danger")
      }
      else {
        clearInterval(interval)
      }

    }, 120000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [randomFatal]);
  function updateAge() {
    if (user.isAlive) {
      userContext.updateCharacterAge(1);
      setModalVisible(true);
      const eventsLength = data.newAgeEvents.data.length;
      const index = Math.floor(Math.random() * eventsLength);
      setRandomIndex(index);
      userContext.updateStatus({ health: -7, happiness: -10, appearance: -5 });
      userContext.updateCharacterMoney(-user.character.occupation.salary)
    }
  }
  function handleAgePress() {
    updateAge();

  }
  function handleChoice(choice) {
    setModalVisible(false);
    setFatalModal(false);
    const health = choice.healthEffect;
    const happiness = choice.happinessEffect;
    userContext.updateStatus({
      health: health,
      happiness: happiness
    })

    console.log(health, happiness);
  }
  const closeModal = () => {
    setModalVisible(false);
  };
  const closeFatalModal = () => {
    setFatalModal(false)
  }

  if (isLoading) {
    return (
      <View style={loadingStyle.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const title = data.newAgeEvents.data[randomIndex].description;
  const choices = data.newAgeEvents.data[randomIndex].choice;
  const fatalEventTitle = data.fatalEvents.data[randomFatal].description;
  const fatalEventsChoices = data.fatalEvents.data[randomFatal].choice;
  return (
    <ScrollView style={styles.container}>
      {/* Level progress bar*/}
      <PercentageBar
        width={"100%"}
        height={14}
        backgroundColor={"#E0E9F2"}
        completedColor={COLOR.happinessColor}
        percentage={Math.round(userContext.progress, 2)}
      />

      {/* Top container will contain avatar, age and balance*/}
      <View style={styles.topContainer}>
        <View style={styles.userInfo}>
          <View>
            <CustomAvatar width={54} height={54} />
            <View style={styles.level}>
              <Text>{user.character.age}</Text>
            </View>
          </View>
          <View style={styles.characterNameContainer}>
            <Text style={styles.stageStyle}> {lifeStage}</Text>
            <Text style={styles.username}>{user.userName}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.balance}>Balance:</Text>
          <Text style={styles.money}>${user.character.money}</Text>
        </View>
      </View>

      {/* Container of user's events and different age */}
      <View style={[styles.eventsContainer, { minHeight: windowHeight * 0.55 }]}>
        <View style={styles.avatarContainer}>
          <AnimatedImage
            entering={BounceIn.duration(500).delay(100).springify()}
            exiting={BounceOut.duration(300).delay(100).springify()}
            style={[styles.avatar, { height: windowHeight * 0.4 }]}
            source={AVATARS[`${lifeStage}`]}
          />
        </View>
      </View>

      {/* Container of navigators and the status progress bar */}
      <View style={styles.underhalf}>
        <View style={styles.utility}>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.iconNavigateStyle}>
              <MaterialIcons
                name="work"
                size={24}
                color="black"
                onPress={() => {
                  navigation.navigate("Occupation");
                }}
              />
              <Text style={styles.navigateText}>Occupation</Text>
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => {
              navigation.navigate("Assets");
            }}
          >
            <View style={styles.iconNavigateStyle}>
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
            </Pressable>
            {/*  modal component */}

            <SelectionPopup
              modalVisible={modalVisible}
              closeModal={closeModal}
              title={title}
              choices={choices}
              handleChoice={handleChoice}
            />
            {/** modal for fatal events */}
            <SettingPopup
              modalVisible={fatalModal}
              closeModal={closeFatalModal}
              title={fatalEventTitle}
              choices={fatalEventsChoices}
              handleChoice={handleChoice}
            />
          </View>

          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => {
              navigation.navigate("Relationship");
            }}
          >
            <View style={styles.iconNavigateStyle}>
              <AntDesign name="heart" size={24} color="black" />
              <Text style={styles.navigateText}>Relationship</Text>
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => navigation.navigate("SchoolScreen")}
          >
            <View style={styles.iconNavigateStyle}>
              <Ionicons name="school" size={24} color="black" />
              <Text style={styles.navigateText}>Education</Text>
            </View>
          </Pressable>
        </View>
        <CharacterStatus />
      </View>
    </ScrollView>
  );
}
