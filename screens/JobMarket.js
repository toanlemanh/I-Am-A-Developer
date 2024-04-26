import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import Card from "../components/Card";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import data from "../data/data.json";
import { UserContext } from "../context/user-context";
import { styles } from "../Style/screenStyles/JobMarketStyle";
export default function JobMarket() {

  const jobs = data.jobs.data;

  const [selectedJob, setSelectedJob] = useState(null); // Track currently selected job
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = (job) => {
    setSelectedJob(job); // Set the selected asset before opening modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null); // Clear selected job on close
  };

  const renderJD = (job) => {
    return (
      <View style={styles.JDContainer}>
        <Text><Text style={styles.label}>Requirement:</Text> {Object.entries(job.requirements).map(([key, value]) => `${key}: ${value}`).join(', ')}</Text>
        <Text><Text style={styles.label}>Subject Requirements:</Text> {Object.entries(job.subjectRequirements).map(([key, value]) => `${key}: ${value}`).join(', ')}</Text>
        <Text><Text style={styles.label}>Salary:</Text> {job.salary}</Text>
      </View>
    )
  }

  const { userState, updateUser } = useContext(UserContext);

  const checkEligibilityAndUpdateStatus = (job) => {
    // Retrieve the user's qualifications from the user state
    const { higherEducation } = userState;

    // Check if the user meets all the job's subject requirements
    const isEligible = Object.entries(job.requirements).every(([subject, requiredLevel]) => {
      const userLevel = higherEducation[subject.toLowerCase()] || 0;
      return userLevel >= requiredLevel;
    });

    if (isEligible) {
      // User is eligible, update their status
      // This would be a function similar to the updateUserLogin from your context
      updateUser({ occupation: job });

    } else {
      // User is not eligible, show a notification
      // This would depend on how you want to implement notifications - Alert, Modal, Snackbar, etc.
      alert('You do not meet the requirements for this job.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.list}>
        {jobs.map((job) => (
          <Card
            key={job.id}
            barHidden={true}
            showDetail={true}
            onPress={() => openModal(job)}
          >
            {job.name}

          </Card>
        ))}
      </View>
      <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={selectedJob?.name}
        content={selectedJob ? renderJD(selectedJob) : null}

        buttonText={"Apply now"}
        buttonOnPress={() => checkEligibilityAndUpdateStatus(selectedJob)}
      // buttonOnPress={() => alert('test button')}
      />
    </ScrollView>
  )
}
