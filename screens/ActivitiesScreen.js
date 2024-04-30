import { useContext, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { styles } from "../Style/screenStyles/ActivitiesStyle";
import Card from "../components/Card";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import { UserContext } from "../context/user-context";
import data from "../data/data.json";
import { lockActivitiesScreen } from "../utils/lockscreens";
export default function ActivitiesScreen() {
  const activities = data.activities.data;
  const userContext = useContext(UserContext);
  const age = userContext.userState.character.age;
  const health = userContext.userState.status.health;
  const [selectedActivity, setSelectedActivity] = useState(null); // Track currently selected job
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = (activity) => {
    if (lockActivitiesScreen(age, health)) {
      return;
    }
    setSelectedActivity(activity); // Set the selected asset before opening modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedActivity(null); // Clear selected job on close
  };

  const activityHandler = () => {
    setModalVisible(false);
    setSelectedActivity(null);

    let enoughMoney = true;
    enoughMoney = userContext.updateCharacterMoney(selectedActivity.cost);

    if (enoughMoney === true) {
      userContext.updateStatus({
        health: selectedActivity.effects.health,
        happiness: selectedActivity.effects.happiness,
        appearance: selectedActivity.effects.appearance,
      });
      Alert.alert(
        "You have finished an action, please don't do that again today!"
      );
    } else Alert.alert("You don't have enough money, please work harder!");
  };

  const renderActivity = (cost, happiness, health, appearance) => {
    return (
      <View style={styles.horizontalContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Cost: $</Text>
          <Text style={styles.label}>Effects:</Text>
          <Text style={styles.effect}>Happiness:</Text>
          <Text style={styles.effect}>Health:</Text>
          <Text style={styles.effect}>Appearance:</Text>
        </View>

        <View style={styles.valueContainer}>
          <Text> {cost}</Text>
          <Text> </Text>
          <Text> {happiness}</Text>
          <Text> {health}</Text>
          <Text> {appearance}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.list}>
        {activities.map((activity, itemIndex) => (
          <Card
            time={itemIndex}
            key={activity.name}
            barHidden={true}
            showDetail={true}
            onPress={() => openModal(activity)}
          >
            {activity.name}
          </Card>
        ))}
      </View>
      <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={selectedActivity?.name}
        buttonOnPress={activityHandler}
        content={renderActivity(
          selectedActivity?.cost,
          selectedActivity?.effects.happiness,
          selectedActivity?.effects.health,
          selectedActivity?.effects.appearance
        )}
        buttonText={"Do it!"}
      />
    </ScrollView>
  );
}
