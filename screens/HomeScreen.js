import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { styles } from "../Style/screenStyles/HomeScreenStyle";
import CharacterStatus from "../components/CharacterStatus";
import CustomAvatar from "../components/CustomAvatar";
import PercentageBar from "../components/ProgressBar";
import SelectionPopup from "../components/eventsPopup/SelectionPopup";
import { COLOR } from "../constants/GlobalColor";
import { AuthContext } from "../context/auth";
import { getUserId } from "../context/axios";
import { UserContext } from "../context/user-context";
import data from "../data/data.json";
import { AVATARS } from "../utils/avatars";
import { CONSTRAINTS } from "../utils/constraints";
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
          // userContext.loadUserDataFromStorage(userId);
          //  userContext.saveUserDataToStorage(userId);
        }
      }
    }
    loadUserName();
  }, [userId]);
  const [lifeStage, setLifeStage] = useState("Infant");
  useEffect(() => {
    if (user.character.age === 18 && !user.character.inShool && !user.character.inUniversity && user.character.occupation.salary === 0) {
      userContext.levelupAllEducation()
      user.character.money += 10000
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
    if (user.character.age <= 1) {
      setLifeStage("Infant");
    } else if (user.character.age <= 9) {
      setLifeStage("Kid");
    } else if (user.character.age <= 19) {
      setLifeStage("Teenager");
    } else if (user.character.age <= 60) {
      setLifeStage("Adult");
    } else setLifeStage("Old");
  }, [user.character.age]);

  //condition for modal to show when level-up (progress =100)
  useEffect(() => {
    if (userContext.progress >= 100) {
      const eventsLength = data.newAgeEvents.data.length;
      const index = Math.floor(Math.random() * eventsLength);

      setRandomIndex(index);
      setModalVisible(true);
    }
  }, [userContext.progress]);
  function updateAge() {
    userContext.updateCharacterAge(1);
    setModalVisible(true);
    const eventsLength = data.newAgeEvents.data.length;
    const index = Math.floor(Math.random() * eventsLength);
    setRandomIndex(index);
    userContext.updateStatus({ health: -7, happiness: -10, appearance: -5 });
  }
  function handleAgePress() {
    updateAge();

  }
  function handleChoice1() {
    setModalVisible(false);
    const health = data.newAgeEvents.data[randomIndex].choice[0].healthEffect;
    const happiness = data.newAgeEvents.data[randomIndex].choice[0].happinessEffect;
    userContext.updateStatus({
      health: health,
      happiness: happiness
    })

    console.log(health, happiness);
  }
  function handleChoice2() {
    setModalVisible(false);
    const health = data.newAgeEvents.data[randomIndex].choice[1].healthEffect;
    const happiness = data.newAgeEvents.data[randomIndex].choice[1].happinessEffect;
    userContext.updateStatus({
      health: health,
      happiness: happiness
    })
    console.log(health, happiness);
  }

  function handleChoice3() {
    setModalVisible(false);
    const health = data.newAgeEvents.data[randomIndex].choice.length === 3
      ? data.newAgeEvents.data[randomIndex].choice[2].healthEffect : 0;

    const happiness = data.newAgeEvents.data[randomIndex].choice.length === 3
      ? data.newAgeEvents.data[randomIndex].choice[2].happinessEffect : 0
    userContext.updateStatus({
      health: health,
      happiness: happiness
    })
    console.log(health, happiness);
  }
  const closeModal = () => {
    setModalVisible(false);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const title = data.newAgeEvents.data[randomIndex].description;
  const choice1 = data.newAgeEvents.data[randomIndex].choice[0].description;
  const choice2 = data.newAgeEvents.data[randomIndex].choice[1].description;
  const choice3 =
    data.newAgeEvents.data[randomIndex].choice.length === 3
      ? data.newAgeEvents.data[randomIndex].choice[2].description
      : null;

  return (
    <View style={styles.container}>
      {/* Level progress bar*/}
      <PercentageBar
        width={"100%"}
        height={12}
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
            <Text style={styles.username}>
              {Math.round(userContext.progress)}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.balance}>Balance:</Text>
          <Text style={styles.money}>${user.character.money}</Text>
        </View>
      </View>

      {/* Container of user's events and different age */}
      <View style={styles.eventsContainer}>
        <View style={styles.avatarContainer}>
          <AnimatedImage
            entering={BounceIn.duration(500).delay(100).springify()}
            exiting={BounceOut.duration(300).delay(100).springify()}
            style={styles.avatar}
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
            <View style={{ justifyContent: "center", alignItems: "center" }}>
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
              choice1={choice1}
              choice2={choice2}
              choice3={choice3}
              handleChoice1={handleChoice1}
              handleChoice2={handleChoice2}
              handleChoice3={handleChoice3}
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
    </View>
  );
}
