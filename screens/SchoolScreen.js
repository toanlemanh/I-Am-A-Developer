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
import { CONSTRAINTS } from "../utils/constraints";
import { COLOR } from "../constants/GlobalColor";
function SchoolScreen() {
  const userContext = useContext(UserContext);
  const user = userContext.userState;
  const subjects = user.education;
  const universitySubjects = user.higherEducation;
  const [selectedSubject, setSelectedSubject] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const learningState = userContext.learningState
  const learningSubject = learningState.learningSubject
  useEffect(() => {
    if (user.character.age < CONSTRAINTS.age.attendSchool) {
      Alert.alert("Not Eligible", "You are not old enough to attend school.");
    }
  }, [user.character.age]);


  const openModal = (subject) => {
    setSelectedSubject(subject)
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  function transformText(text) {
    if (text) {
      let modifiedText = text
      const firstUpperCaseIndex = modifiedText.search(/[A-Z]/);
      if (firstUpperCaseIndex !== -1) {
        modifiedText = modifiedText.substring(0, firstUpperCaseIndex) + " " + modifiedText.substring(firstUpperCaseIndex);
      }
      modifiedText = modifiedText[0].toUpperCase() + modifiedText.substring(1);
      return modifiedText
    }
    return ""
  }

  const applyToUniversity = () => {
    userContext.updateInUniversity(true);
    userContext.updateOccupation("", 0)
  };

  const startLearning = (subject) => {
    if (learningSubject === "" && learningState.learningProgress === CONSTRAINTS.education.learningProgess.min) {
      userContext.updateLearningSubject(subject)
      const id = setInterval(() => {
        userContext.updateLearningProgress(10)
      }, 1000)
      userContext.updateLearningId(id)
    }
    closeModal()
  }


  useEffect(() => {
    if (learningState.learningProgress >= CONSTRAINTS.education.learningProgess.max) {
      clearInterval(learningState.intervalId)
      if (user.character.age >= CONSTRAINTS.age.attendSchool && user.character.age < CONSTRAINTS.age.legalAdult && !user.character.inUniversity)
        userContext.levelupEducation(learningSubject)
      console.log(learningSubject)
      if (user.character.inUniversity)
        userContext.levelupHigherEducation(learningSubject)

    }
  }, [learningState.learningProgress])
  if (learningState.learningProgress >= CONSTRAINTS.education.learningProgess.max) {
    userContext.updateLearningProgress(-CONSTRAINTS.education.learningProgess.max)
    userContext.updateLearningSubject("")
  }

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
          Currently cultivating {transformText(learningSubject)}
        </Text>
        <Text style={styles.yearText}>{learningState.learningProgress}% </Text>
      </View>
      <PercentageBar
        width={"100%"}
        height={12}
        backgroundColor={COLOR.progessBar}
        completedColor={COLOR.completedColor}
        percentage={learningState.learningProgress}
      />
      <ScrollView style={styles.container}>
        {user.character.age >= CONSTRAINTS.age.attendSchool && user.character.age < CONSTRAINTS.age.legalAdult && !user.character.inUniversity ? (
          Object.keys(subjects).map(subject => {
            const subjectName = transformText([subject][0])
            return (
              <Card
                key={[subject]}
                percentage={subjects[subject] * 20}  // Assuming fixed percentage
                showDetail={true}
                onPress={() => openModal([subject][0])}
              >
                <Text>{subjectName}</Text>
              </Card>
            )
          }
          )
        ) : null}

        {user.character.age >= CONSTRAINTS.age.legalAdult && !user.character.inUniversity ? (
          <View style={styles.buttonContainer}>
            <Button title="Apply to University" onPress={applyToUniversity} />
          </View>
        ) : null}

        {user.character.inUniversity && (
          Object.keys(universitySubjects).map((subject) => {
            const subjectName = transformText([subject][0])
            return (
              <Card
                key={[subject]}
                percentage={universitySubjects[subject] * 20}  // Assuming fixed percentage
                showDetail={true}
                onPress={() => openModal(subject)}
              >
                <Text>{subjectName}</Text>
              </Card>
            )
          }
          )
        )}

        <AlertPopup
          modalVisible={modalVisible}
          closeModal={closeModal}
          title={selectedSubject ? transformText(selectedSubject) : "Subject"}
          content={selectedSubject ? renderContent(
            transformText(selectedSubject),
            4,
            user.character.inUniversity ? universitySubjects[selectedSubject] : subjects[selectedSubject]
          ) : null}
          buttonOnPress={() =>
            startLearning(selectedSubject)
          }
          buttonText={"Start Learning"}
        />
      </ScrollView>
    </View>

  );
}
export default SchoolScreen;
