import { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../Style/screenStyles/JobMarketStyle";
import Card from "../components/Card";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import { UserContext } from "../context/user-context";
import data from "../data/data.json";

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
        <View>
          <Text style={styles.label}>Requirements:</Text>
          <View>
            {Object.entries(job.requirements).map(([key, value]) => <Text>{key}: {value}</Text>)}
          </View>
        </View>

        <View>
          <Text style={styles.label}>Subject Requirements:</Text>
          <View>
            {Object.entries(job.subjectRequirements).map(([key, value]) => <Text>{key}: {value}</Text>)}
          </View>
        </View>
        <Text><Text style={styles.label}>Salary:</Text> ${job.salary}</Text>
      </View>
    )
  }

  const userContext = useContext(UserContext);

  const userState = userContext.userState
  const checkEligibilityAndUpdateStatus = (job) => {
    // Retrieve the user's qualifications from the user state
    const { higherEducation } = userState;

    console.log("Higher Education:", higherEducation);
    console.log("Job Requirements:", job.requirements);

    // Check if the user meets all the job's subject requirements
    const isEligible = Object.entries(job.requirements).every(([subject, requiredLevel]) => {
      const userLevel = higherEducation[subject] || 0;
      return userLevel >= requiredLevel;
    });

    if (isEligible) {
      // User is eligible, update their status
      // This would be a function similar to the updateUserLogin from your context
      userContext.updateUser({ character: { ...userState.character, occupation: job } });
      userContext.updateInUniversity(false)
      console.log
      alert('You have successfully applied for the job!');
    } else {
      // User is not eligible, show a notification
      // This would depend on how you want to implement notifications - Alert, Modal, Snackbar, etc.
      alert('You do not meet the requirements for this job.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.list}>
        {jobs.map((job, itemIndex) => (
          <Card
            time={itemIndex}
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
