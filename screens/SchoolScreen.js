import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Alert,
  Button
} from "react-native";
import Card from "../components/Card";
import PercentageBar from "../components/ProgressBar";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import data from "../data/data.json";
import { UserContext } from "../context/user-context";
import { styles } from "../Style/screenStyles/SchoolStyle";

function SchoolScreen() {
  // const { userState } = useContext(UserContext);
  const userContext = useContext(UserContext);
  const user = userContext.userState;

  const subjects = data.subjects.data;
  const universitySubjects = data.universitySubjects.data;

  const [selectedSubject, setSelectedSubject] = useState(null); // Track currently selected job
  const [modalVisible, setModalVisible] = useState(false);
  // const [appliedToUniversity, setAppliedToUniversity] = useState(false);


  const openModal = (subject) => {
    setSelectedSubject(subject); // Set the selected asset before opening modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSubject(null); // Clear selected subject on close
  };

  useEffect(() => {
    if (user.character.age < 6) {
      Alert.alert("Not Eligible", "You are not old enough to attend school.");
    }
  }, [user.character.age]);

  const applyToUniversity = () => {
    userContext.updateInUniversity(true);
  };

  const quitUniversity = () => {
    setIsEnrolledInUniversity(false);
    Alert.alert("Notice", "You have successfully quit university.");
  };

  const renderContent = (name, duration, level) => {
    return (
      <View>
        <Text><Text style={styles.label}>Name:</Text> {name}</Text>
        <Text><Text style={styles.label}>Duration:</Text> {duration}</Text>
        <Text><Text style={styles.label}>Level:</Text> {level}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {user.character.age >= 6 && user.character.age < 18 && !user.character.inUniversity ? (
        subjects.map((subject) => (
          <Card
            key={subject.id}
            percentage={50}  // Assuming fixed percentage
            showDetail={true}
            onPress={() => openModal(subject)}
          >
            <Text>{subject.name}</Text>
          </Card>
        ))
      ) : null}

      {user.character.age >= 18 && !user.character.inUniversity ? (
        <View style={styles.buttonContainer}>
          <Button title="Apply to University" onPress={applyToUniversity} />
        </View>
      ) : null}

      {user.character.inUniversity && (
        universitySubjects.map((subject) => (
          <Card
            key={subject.id}
            percentage={50}  // Assuming fixed percentage for demonstration
            showDetail={true}
            onPress={() => openModal(subject)}
          >
            <Text>{subject.name}</Text>
          </Card>
        ))
      )}

      <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={selectedSubject ? selectedSubject.name : "Subject"}
        content={selectedSubject ? renderContent(
          selectedSubject?.name,
          selectedSubject?.duration,
          selectedSubject?.level,
        ) : null}
        buttonText={"OK"}
      />
    </ScrollView>
  );
}
export default SchoolScreen;


// create progress bar => current subject (time)
// currently tu luyen
// const subjects
// level, name, avatar
// card => pstore level data => view
//const subjects = [  {id: "Math"} ]
