import React from 'react';
import { View, Text, ScrollView, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import AlertPopup from '../components/eventsPopup/AlertPopup';
import { useState, useContext, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UserContext } from '../context/user-context';
import { styles } from '../Style/screenStyles/OccupationStyle'

export default function OccupationScreen({ navigation }) {

  const { userState, updateUser } = useContext(UserContext);

  const { occupation } = userState.character;

  useEffect(() => {
    console.log("Occupation updated to:", occupation);
  }, [occupation]);

  useEffect(() => {
    if (occupation && occupation.name === '' && occupation.salary === 0) {
      updateUser({ character: { ...userState.character, occupation: null } });
    }
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
    updateUser({ character: { ...userState.character, occupation: null } });
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
        {occupation ? (
          <Card
            onPress={openModal}
            barHidden={false}
            showDetail={true}
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
            <Text style={{ color: 'white' }}>Find jobs</Text>
            <FontAwesome name="search" size={21} color="white" />
          </View>
        </ButtonComponent>
      </View>
    </ScrollView>
  );
}
