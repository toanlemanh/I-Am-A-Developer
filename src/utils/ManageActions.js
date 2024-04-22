import { useState } from "react";
import { Text, View } from "react-native";
import AlertPopup from "../components/eventsPopup/AlertPopup";
const [modalVisible, setModalVisible] = useState(false);
const openModal = () => {
    setModalVisible(true);
};

const closeModal = () => {
    setModalVisible(false);
};


const renderModal = (action, content) => {
    setModalVisible = true
    return <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={action}
        content={(
            <View>
                <Text>{content}</Text>
            </View>
        )}
        buttonText={"OK"}
    />
}

function updateStatus({ name, health, happiness, look, relationshipLevel }) {
    // add operations to target a specific npc with their name
    // add operations to handle context changes
}
export function SpendTime(name) {
    const effects = {
        health: 0,
        happiness: 20,
        look: 0,
        relationshipLevel: 20
    }
    const content = "You spent some time with " + name + ". You have gain: "
    if (effects.relationshipLevel !== 0) content.append(" Relationship level: " + effects.relationshipLevel)
    if (effects.health !== 0) content.append(" health: " + effects.health)
    if (effects.happiness !== 0) content.append(" happiness: " + effects.happiness)
    if (effects.look !== 0) content.append(" look: " + effects.look)

    updateStatus(name, effects)
    return (
        renderModal(name, "Spend Time", content)
    )
}
export function PartyTogether(name) {
    const effects = {
        health: 0,
        happiness: 20,
        look: 0,
        relationshipLevel: 20
    }
    const content = "You had a party with " + name + ". You have gain: "
    if (effects.relationshipLevel !== 0) content.append(" Relationship level: " + effects.relationshipLevel)
    if (effects.health !== 0) content.append(" health: " + effects.health)
    if (effects.happiness !== 0) content.append(" happiness: " + effects.happiness)
    if (effects.look !== 0) content.append(" look: " + effects.look)
    return (
        renderModal(name, "Party Together", content)
    )
}
export function Gift(name) {
    const effects = {
        health: 0,
        happiness: 20,
        look: 0,
        relationshipLevel: 20
    }
    const content = "You sent a gift to " + name.name + ". You have gain: "
    if (effects.relationshipLevel !== 0) content.append(" Relationship level: " + effects.relationshipLevel)
    if (effects.health !== 0) content.append(" health: " + effects.health)
    if (effects.happiness !== 0) content.append(" happiness: " + effects.happiness)
    if (effects.look !== 0) content.append(" look: " + effects.look)

    updateStatus(name, effects)

    return (
        renderModal(name, "Send a Gift", content)
    )
}
export function GiveMoney(name) {
    return (
        renderModal(name, "Give Money")
    )
}
export function HaveConversation(name) {

    return (
        renderModal(name, "Have Conversation")
    )
}

