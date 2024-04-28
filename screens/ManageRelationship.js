import { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import CustomDataLabel from "../components/CustomDataLabel";
import  ManageActions,{  } from "../utils/ManageActions";
import { styles } from "../Style/screenStyles/ManageRelaStyle";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import { spendTime } from "../utils/ManageActions";
export default function ManageRelationship({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionModal,setActionModal] = useState(false);
  const [relationship, setRelationship] = useState({
    name: route.params.dataName,
    type: route.params.relationshipType,
    level: route.params.relationshipLevel,
    job: route.params.occupation,
  });
  const [action ,setAction] = useState('')

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
  const closeActionModal =()=>{
    setActionModal(false);
  }
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

  const actionModalContent = (content) => {
    return(
      <View>
        <Text>{content}</Text>
      </View>
    )
  };
  const  spendTime =(name)=> {
    setActionModal(true);
    const effects = {
      health: 0,
      happiness: 20,
      look: 0,
      relationshipLevel: 20,
    };
    
    const content = "You spent some time with " + name + ". You have gain: ";
    if (effects.relationshipLevel !== 0)
      content + " Relationship level: " + effects.relationshipLevel;
    if (effects.health !== 0) content + " health: " + effects.health;
    if (effects.happiness !== 0) content + " happiness: " + effects.happiness;
    if (effects.look !== 0) content + " look: " + effects.look;
    content + ".";
    //updateStatus(name, effects);
    setAction(content);
  
  }



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
        onPress={() => partyTogether(relationship.name)}
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
        modalVisible={actionModal}
        closeModal={closeActionModal}
        title={"Spend Time"}
        content={actionModalContent(action)}
        buttonText={"OK"}
      />



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
