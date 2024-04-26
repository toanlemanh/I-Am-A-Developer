import React from 'react';
import { View, Text, StyleSheet, ScrollView,  Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import Card from '../components/Card'; 
import AlertPopup from '../components/eventsPopup/AlertPopup';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function OccupationScreen({navigation}) {
  const occupations = [ 
    {
      job: "IT Lecturer",
      enterprise:"Hanoi University",
      years: "2",
      salary: "600 USD",
      rate: "3.9%", 
    },
   
    {
      job: "Software Engineering",
      enterprise:"Rikkei Soft",
      years: "3",
      salary: "3500 USD",
      rate: "3.5%",
    },
  ];

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
  const renderContent = (enterprise, years, salary, rate) => {
    return (
      <View>
         <Text><Text style={styles.label}>Enterprise:</Text> {enterprise}</Text>
         <Text><Text style={styles.label}>Years:</Text> {years}</Text>
         <Text><Text style={styles.label}>Salary:</Text> {salary}</Text>
         <Text><Text style={styles.label}>Rate:</Text> {rate}</Text>
      </View>
    )
  }
  

  const ButtonComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems:'center'}}>
      {occupations.map((occupation) => ( 
        <Card key={occupation.job} barHidden={true} showDetail={true} onPress={()=> openModal(occupation)}>
          <Text>{occupation.job}</Text>
        </Card>
      ))}
      </View>
      <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={selectedJob?.job}
        content={renderContent(
            selectedJob?.enterprise,
            selectedJob?.years,
            selectedJob?.salary,
            selectedJob?.rate,
        )}
        buttonText={"OK"}
      />
        <View style={styles.buttonOutterContainer}>
          <ButtonComponent onPress={()=>{
              navigation.navigate('Job Market')
          }}>
            <View style={styles.buttonContainer}>
                <Text style={{color:'white'}}>Find jobs</Text>
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
  buttonOutterContainer:{
    alignItems:'center',
  },
  buttonContainer:{
    marginVertical:12,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    width: wp('33%'),
    height: hp('8%'),
    borderRadius:12,
    backgroundColor:'#878DD8',
    elevation:7,
    shadowColor: "#000",
    shadowOffset: {width: 0, height:2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize:16
  },
 
  
 
});
