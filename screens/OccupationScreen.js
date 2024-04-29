import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Platform, ScrollView, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { styles } from '../Style/screenStyles/OccupationStyle';
import Card from '../components/Card';
import AlertPopup from '../components/eventsPopup/AlertPopup';
import { UserContext } from '../context/user-context';

export default function OccupationScreen({ navigation }) {

  const userContext = useContext(UserContext);

  const occupation = userContext.userState.character.occupation;

  useEffect(() => {
    console.log("Occupation updated to:", occupation);
  }, [occupation]);


  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    // setSelectedJob(null); // Clear selected job on close
  };
  const quitJob = () => {
    // Function to call when user quits their job
    userContext.updateOccupation("", 0)
    closeModal();
  };

  const renderJobDetails = (job) => {
    if (!job) return <Text>Go find a job</Text>;
    return (
      <View style={styles.detailsContainer}>
        <Text><Text style={styles.label}>Job:</Text> {job.job}</Text>
        <Text><Text style={styles.label}>Years:</Text> {job.years}</Text>
        <Text><Text style={styles.label}>Salary:</Text> {job.salary}</Text>
      </View>
    );
  };

  const ButtonComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <ScrollView style={styles.container}>

      <View style={styles.buttonOutterContainer}>
        {occupation.salary !== 0 ? (
          <Card
            onPress={openModal}
            barHidden={true}
            showDetail={false}
          >
            {occupation.name ? occupation.name : "No Current Job"}
          </Card>
        ) : (
          <Card
            onPress={openModal}
            barHidden={true}
            showDetail={false}
          >
            No Current Job
          </Card>
        )}
      </View>
      <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal} // General close modal function
        title={occupation?.name || "No Current Job"}
        content={renderJobDetails(occupation)}
        buttonText={occupation ? "Quit Job" : "OK"}  // Text changes based on occupation presence
        buttonOnPress={occupation ? quitJob : closeModal}  // Function changes based on occupation presence
      />
      <View style={styles.buttonOutterContainer}>
        <ButtonComponent onPress={() => {
          navigation.navigate('Job Market')
        }}>
          <View style={styles.buttonContainer}>
            <Text style={styles.findjob}>Find jobs</Text>
            <FontAwesome name="search" size={21} color="white" />
          </View>
        </ButtonComponent>
      </View>
    </ScrollView>
  );
}
