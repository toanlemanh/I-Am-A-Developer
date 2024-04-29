import { act, useLayoutEffect, useState,useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import CustomDataLabel from "../components/CustomDataLabel";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import data from "../data/userData.json";
import { styles } from "../Style/screenStyles/ManageRelaStyle";
import { UserContext } from "../context/user-context";
export default function ManageRelationship({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [relationship, setRelationship] = useState({
    name: route.params.dataName,
    group: route.params.relationshipType,
    level: route.params.relationshipLevel,
    job: route.params.occupation,
  });
  const [actionText, setActionText] = useState('');
  const [actionName,setActionName] = useState('');
  // Retrieve all relationships from data
  const relationships = data.Relationships;
  const userContext = useContext(UserContext);
  // Function to open modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalVisible(false);
  };


  // Function to close action modal
  const closeActionModal = () => {
    setActionModal(false);
  };

  // Function to render modal content for actions
  const actionModalContent = (content) => {
    return (
      <View>
        <Text>{content}</Text>
        
      </View>
    );
  };

  const renderContent = (level, job, group) => {
    return (
      <View>
        <Text>
          <Text style={styles.label}>Group:</Text> {group}
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

  // Function to spend time with the person
  // Filter actions based on the name of the person
  const filteredActions =relationships.find((person) => person.name === relationship.name)?.actions ||[];

// Function to handle action click
const handleActionClick = (action) => {
  setActionText(generateActionContent(action));
  setActionModal(true);
  setActionName(action.actionTitle);
  userContext.updateStatus({
      health:action.health,
      happiness:action.happiness,
      appearance:action.look
  });
  //Update relationship level here
  userContext.updateRelationshipLevel(relationship.group, relationship.name, action.relationshipLevel)
  console.log(action.health,action.happiness,action.look,action.relationshipLevel);
};

// Function to generate action content
const generateActionContent = (action) => {
  let content = action.actionTitle + " with your " + relationship.group;
  if (action.health !== undefined) content += "\nHealth: " + action.health;
  if (action.happiness !== undefined) content += "\nHappiness: " + action.happiness;
  if (action.look !== undefined) content += "\nLook: " + action.look;
  if (action.relationshipLevel !== undefined) content += "\nRelationship Level: " + action.relationshipLevel;
  return content;
};


return (
<ScrollView contentContainerStyle={styles.container}>
  <Card barHidden={true} showDetail={true} onPress={openModal}>
    {relationship.name}
  </Card>
  <CustomDataLabel>Action List</CustomDataLabel>
  {/* Render actions based on the name of the person */}
  {filteredActions.map((action, index) => (
    <View key={index}>
      <Card
        barHidden={true}
        onPress={() => handleActionClick(action)} // Pass action to handleActionClick
        showDetail={true}
      >
        {action.actionTitle}
      </Card>
    </View>
  ))}

  {/* Render action modal */}
  <AlertPopup
    modalVisible={actionModal}
    closeModal={closeActionModal}
    title={actionName} // Assuming you want to display the name of the person
    content={actionModalContent(actionText)} // Pass actionText as content
    buttonText={"OK"}
  />

  {/* Render relationship modal */}
  <AlertPopup
    modalVisible={modalVisible}
    closeModal={closeModal}
    title={relationship.name}
    content={renderContent(
      relationship.level,
      relationship.job,
      relationship.group
    )}
    buttonText={"OK"}
  />
</ScrollView>
);

}
