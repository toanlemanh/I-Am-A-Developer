import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  Text,
  View
} from "react-native";
import { styles } from "../Style/screenStyles/SchoolStyle";
import Card from "../components/Card";
import PercentageBar from "../components/ProgressBar";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import { UserContext } from "../context/user-context";
import data from "../data/data.json";
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
    <View style={styles.container}>
      <View style={styles.learningContainer}>
        <Text style={styles.tuluyenText}>
          Currently tu luyện {subjects[1].name}
        </Text>
        <Text style={styles.yearText}>{subjects[1].duration} years</Text>
      </View>
      <PercentageBar
        width={"100%"}
        height={12}
        backgroundColor={"#E0E9F2"}
        completedColor={"#EB9F4A"}
        percentage={50}
      />
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
    </View>

  );
}
export default SchoolScreen;


// create progress bar => current subject (time)
// currently tu luyen
// const subjects
// level, name, avatar
// card => pstore level data => view
//const subjects = [  {id: "Math"} ]
