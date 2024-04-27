import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../Style/screenStyles/ActivitiesStyle";
import Card from "../components/Card";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import data from "../data/data.json";
export default function ActivitiesScreen() {
    const activities = data.activities.data;

    const [selectedActivity, setSelectedActivity] = useState(null); // Track currently selected job
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = (activity) => {
        setSelectedActivity(activity); // Set the selected asset before opening modal
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedActivity(null); // Clear selected job on close
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
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.list}>
                {activities.map((activity) => (
                    <Card
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
                content={renderActivity(
                    selectedActivity?.cost,
                    selectedActivity?.effects.happiness,
                    selectedActivity?.effects.health,
                    selectedActivity?.effects.appearance,
                )}
                buttonText={"Do it!"}
            />
        </ScrollView>
    )
}
