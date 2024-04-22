import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import AlertPopup from "../components/eventsPopup/AlertPopup";
export default function ActivitiesScreen() {
    const activities = [
        {
            name: "Go for a walk",
            cost: 0,
            effects: {
                happiness: 10,
                health: 10,
                look: 1,
            }
        },
        {
            name: "Go to the Gym",
            cost: 30,
            effects: {
                happiness: 10,
                health: 10,
                look: 5,
            }
        },
        {
            name: "Visit Doctor",
            cost: 200,
            effects: {
                happiness: 10,
                health: 20,
                look: 0,
            }
        }, {
            name: "Get a haircut",
            cost: 50,
            effects: {
                happiness: 10,
                health: 0,
                look: 10,
            }
        },
        {
            name: "Get a Massage",
            cost: 30,
            effects: {
                happiness: 10,
                health: 10,
                look: 2,
            }
        },
        {
            name: "Find Love",
            cost: 0,
            effects: {
                happiness: 10,
                health: 10,
                look: 1,
            }
        },
    ];


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

    const renderActivity = (cost, happiness, health, look) => {
        return (
            <View style={styles.horizontalContainer}>
                <View style={{ flexGrow: 1, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <Text style={styles.label}>Cost:</Text>
                    <Text style={styles.label}>Effects:</Text>
                    <Text style={styles.effect}>Happiness:</Text>
                    <Text style={styles.effect}>Health:</Text>
                    <Text style={styles.effect}>Look:</Text>
                </View>

                <View style={{ flexGrow: 1, flexWrap: 'wrap', alignItems: "flex-start" }}>
                    <Text> {cost}</Text>
                    <Text> </Text>
                    <Text> {happiness}</Text>
                    <Text> {health}</Text>
                    <Text> {look}</Text>
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
                    selectedActivity?.effects.look,
                )}
                buttonText={"Do it!"}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFF1E7',
    },
    horizontalContainer: {
        flexDirection: 'row'
    },
    list: {
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
    },
    effect: {
        fontStyle: 'italic',
        color: '#EB6F4A'
    },


})