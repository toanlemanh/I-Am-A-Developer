import { useState } from "react";
import { Text, View } from "react-native";
import AlertPopup from "../components/eventsPopup/AlertPopup";


const renderModal = (action, content) => {
    setModalVisible = true;
    return (
      <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={action}
        content={
          <View>
            <Text>{content}</Text>
          </View>
        }
        buttonText={"OK"}
      />
    );
  };
export function ManageActions() {
  
  

    function updateStatus({
    name,
    health,
    happiness,
    look,
    relationshipLevel,
  }) {
    console.log("Update")
  }
   

   

  function partyTogether(name) {
    const effects = {
      health: 0,
      happiness: 20,
      look: 0,
      relationshipLevel: 20,
    };

    const content = "You had a party with " + name + ". You have gain: ";
    if (effects.relationshipLevel !== 0)
      content.append(" Relationship level: " + effects.relationshipLevel);
    if (effects.health !== 0) content.append(" health: " + effects.health);
    if (effects.happiness !== 0)
      content.append(" happiness: " + effects.happiness);
    if (effects.look !== 0) content.append(" look: " + effects.look);

    return renderModal(name, "Party Together", content);
  }

  function gift(name) {
    const effects = {
      health: 0,
      happiness: 20,
      look: 0,
      relationshipLevel: 20,
    };

    const content = "You sent a gift to " + name.name + ". You have gain: ";
    if (effects.relationshipLevel !== 0)
      content.append(" Relationship level: " + effects.relationshipLevel);
    if (effects.health !== 0) content.append(" health: " + effects.health);
    if (effects.happiness !== 0)
      content.append(" happiness: " + effects.happiness);
    if (effects.look !== 0) content.append(" look: " + effects.look);

    updateStatus(name, effects);

    return renderModal(name, "Send a Gift", content);
  }

  function giveMoney(name) {
    return renderModal(name, "Give Money");
  }
  function haveConversation(name) {
    return renderModal(name, "Have Conversation");
  }

}
 export function spendTime(name) {
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
  
    return renderModal(name, "Spend Time", content);
  }



