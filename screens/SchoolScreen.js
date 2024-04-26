import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Card from "../components/Card";
import PercentageBar from "../components/ProgressBar";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import data from "../data/data.json";

function SchoolScreen() {

  const subjects = data.subjects.data;
  const [selectedSubject, setSelectedSubject] = useState(null); // Track currently selected job
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = (subject) => {
    setSelectedSubject(subject); // Set the selected asset before opening modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSubject(null); // Clear selected subject on close
  };

  const renderContent = (name, duration, level) => {
    return (
      <View>
        <Text><Text style={styles.label}>Name:</Text> {name}</Text>
        <Text><Text style={styles.label}>Duration:</Text> {duration}</Text>
        <Text><Text style={styles.label}>Level:</Text> {level}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {/* Progress bar */}
      <View style={styles.learningContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Currently tu luyện {subjects[1].name}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{subjects[1].duration} years</Text>
      </View>

      <PercentageBar
        width={"100%"}
        height={12}
        backgroundColor={"#E0E9F2"}
        completedColor={"#EB9F4A"}
        percentage={50}
      />
      <View style={styles.subjectsContainer}>
        {subjects.map((subject) => {
          return (
            <Card
              key={subject.id}
              percentage={50}
              showDetail={false}
              onPress={() => openModal(subject)}
            >
              <Text>{subject.name}</Text>
            </Card>
          );
        })}
      </View>
      <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={selectedSubject ? selectedSubject.name : "Subject"}
        content={renderContent(
          selectedSubject?.name,
          selectedSubject?.duration,
          // selectedSubject?.level,
        )}
        buttonText={"OK"}
      />
    </ScrollView>
  );
}
export default SchoolScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFF1E7",
    flex: 1,
  },
  learningContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  subjectsContainer: {
    flexDirection: "column",
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  },
});
// create progress bar => current subject (time)
// currently tu luyen
// const subjects
// level, name, avatar
// card => pstore level data => view
//const subjects = [  {id: "Math"} ]
