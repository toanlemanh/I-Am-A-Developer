import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View
} from "react-native";
import { styles } from "../Style/screenStyles/HomeScreenStyle";
import CharacterStatus from '../components/CharacterStatus';
import CustomAvatar from "../components/CustomAvatar";
import PercentageBar from "../components/ProgressBar";
import SelectionPopup from "../components/eventsPopup/SelectionPopup";
import { AuthContext } from "../context/auth";
import { getUserId } from "../context/axios";
import { UserContext } from "../context/user-context";
import data from "../data/data.json";
import { CONSTRAINTS } from "../utils/constraints";
export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  //const [userName, setUserName] = useState("Tom");
  ;
  const [currentKey, setCurrentKey] = useState();
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;
  const userContext = useContext(UserContext);
  const navigation = useNavigation();
  const user = userContext.userState
  const [modalVisible, setModalVisible] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);

  let progressId = ""
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
    progressId = userContext.startProgress()

    return () => { clearInterval(progressId) }

  }, []);

  useEffect(() => {
    AsyncStorage.setItem("progress" + userId, userContext?.progress.toString());
    //console.log("sucess set progress")
    if (userContext.progress > CONSTRAINTS.age.max) {
      userContext.updateProgress(-100)
      userContext.updateCharacterAge(1)
      userContext.updateStatus({ health: -10, happiness: -10, appearance: -5 })
    }
  }, [userContext.progress]);

  useEffect(() => {
    if (user.character.age <= 1) {
      setLifeStage("Infant")
    } else if (user.character.age <= 9) {
      setLifeStage("Kid")
    } else if (user.character.age <= 19) {
      setLifeStage("Teenager")
    } else setLifeStage("Adult")

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

  function handleAgePress() {
    userContext.updateCharacterAge(1);
    setModalVisible(true);
    const eventsLength = data.newAgeEvents.data.length;
    const index = Math.floor(Math.random() * eventsLength);
    setRandomIndex(index);
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
  const choice3 = data.newAgeEvents.data[randomIndex].choice.length === 3 ?
    data.newAgeEvents.data[randomIndex].choice[2].description : null;


  return (
    <View style={styles.container}>
      {/* Level progress bar*/}
      <PercentageBar
        width={"100%"}
        height={12}
        backgroundColor={"#E0E9F2"}
        completedColor={"#EB9F4A"}
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
            <Text style={styles.username}>{Math.round(userContext.progress)}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.balance}>Balance:</Text>
          <Text style={styles.money}>${user.character.money}</Text>
        </View>
      </View>

      {/* Container of user's events and different age */}
      <View style={styles.eventsContainer}>

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