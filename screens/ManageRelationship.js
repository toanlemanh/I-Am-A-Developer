import { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import CustomDataLabel from "../components/CustomDataLabel";
import  ManageActions,{  } from "../utils/ManageActions";
import { styles } from "../Style/screenStyles/ManageRelaStyle";
import AlertPopup from "../components/eventsPopup/AlertPopup";
export default function ManageRelationship({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [relationship, setRelationship] = useState({
    name: route.params.dataName,
    type: route.params.relationshipType,
    level: route.params.relationshipLevel,
    job: route.params.occupation,
  });

  const actions = [
    "suck my dick",
    "play lol",
    "Kiss",
    "Invite drinking",
    "action 4",
    "Playing football",
    "Do some thing",
  ];

  const openModal = () => {
 // Set the selected asset before opening modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
// Clear selected asset on close
  };
  const buttonText = () => {
    return <Text> OK </Text>; 
  };

  useLayoutEffect(() => {
    const group = route.params.group;

    navigation.setOptions({
      title: group.toUpperCase(),
    });
  });

  const renderContent = (level, job, type) => {
    return (
      <View>
        <Text>
          <Text style={styles.label}>Type:</Text> {type}
        </Text>
        <Text>
          <Text style={styles.label}>Level:</Text> {level}
        </Text>
        <Text>
          <Text style={styles.label}>Job:</Text> {job}
        </Text>
      </View>
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card barHidden={true} showDetail={true} onPress={openModal}>
        {relationship.name}
      </Card>
      {/* <Text>
        {type},{level},{job}
      </Text> */}
      <CustomDataLabel>Action List</CustomDataLabel>
      <Card barHidden={true} onPress={() => spendTime(relationship.name)}>
        Spend Time With
      </Card>
      <Card
        barHidden={true}
        //showDetail={true}
        onPress={() => ManageActions.partyTogether(relationship.name)}
      >
        Party Together
      </Card>
      
      <View style={styles.actionsContainer}>
        {/* {() => spendTime(name)} */}
        {actions.map((action, index) => (
          <Card key={index} barHidden={true} showDetail={true}>
            {action}
          </Card>
        ))}
      </View>




      <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={relationship.name}
        content={renderContent(relationship.level, relationship.job, relationship.type)}
        buttonText={buttonText()}
        //buttonOnPress={() => handleTransaction(selectedAsset?.name, selectedAsset?.price)}
      />
    </ScrollView>
  );
}
