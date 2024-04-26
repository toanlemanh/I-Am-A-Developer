import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import AlertPopup from '../components/eventsPopup/AlertPopup';
import { useState, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UserContext } from '../context/user-context';

export default function OccupationScreen({ navigation }) {

  const { userState, setUserState } = useContext(UserContext);

  // const [selectedJob, setSelectedJob] = useState(null); // Track currently selected job
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = (job) => {
    // setSelectedJob(job); // Set the selected asset before opening modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    // setSelectedJob(null); // Clear selected job on close
  };
  // const renderContent = (enterprise, years, salary, rate) => {
  //   return (
  //     <View>
  //        <Text><Text style={styles.label}>Enterprise:</Text> {enterprise}</Text>
  //        <Text><Text style={styles.label}>Years:</Text> {years}</Text>
  //        <Text><Text style={styles.label}>Salary:</Text> {salary}</Text>
  //        <Text><Text style={styles.label}>Rate:</Text> {rate}</Text>
  //     </View>
  //   )
  // }
  const quitJob = () => {
    // Function to call when user quits their job
    setUserState({ ...userState, currentJob: null });
    closeModal();
  };

  const renderJobDetails = (job) => {
    if (!job) return <Text>No Job Assigned</Text>;
    return (
      <View style={styles.detailsContainer}>
        <Text><Text style={styles.label}>Job:</Text> {job.job}</Text>
        <Text><Text style={styles.label}>Enterprise:</Text> {job.enterprise}</Text>
        <Text><Text style={styles.label}>Years:</Text> {job.years}</Text>
        <Text><Text style={styles.label}>Salary:</Text> {job.salary}</Text>
        <Text><Text style={styles.label}>Rate:</Text> {job.rate}</Text>
        <TouchableOpacity style={styles.quitButton} onPress={quitJob}>
          <Text style={styles.quitButtonText}>Quit Job</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const ButtonComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <ScrollView style={styles.container}>
      {/* <View style={{ alignItems:'center'}}>
      {occupations.map((occupation) => ( 
        <Card key={occupation.job} barHidden={true} showDetail={true} onPress={()=> openModal(occupation)}>
          <Text>{occupation.job}</Text>
        </Card>
      ))}
      </View> */}

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.jobTitle}>{userState.currentJob ? userState.currentJob.job : "No Current Job"}</Text>
        </TouchableOpacity>
      </View>

      <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={userState.currentJob?.job || "No Current Job"}
        content={renderJobDetails(userState.currentJob)}
        buttonText={"OK"}
        buttonOnPress={closeModal}
      />
      <View style={styles.buttonOutterContainer}>
        <ButtonComponent onPress={() => {
          navigation.navigate('Job Market')
        }}>
          <View style={styles.buttonContainer}>
            <Text style={{ color: 'white' }}>Find jobs</Text>
            <FontAwesome name="search" size={21} color="white" />
          </View>
        </ButtonComponent>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF1E7',

  },
  buttonOutterContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp('33%'),
    height: hp('8%'),
    borderRadius: 12,
    backgroundColor: '#878DD8',
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  jobTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  quitButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  quitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});