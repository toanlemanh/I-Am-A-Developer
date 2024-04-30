import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { styles } from '../../styles/componentStyles/SelectPopStyle';
function SelectionPopup({
    modalVisible,
    closeModal,
    title,
    choices,
    handleChoice

}) {
    const { width: windowWidth } = useWindowDimensions()
    const gradientColor = ['#005D63', '#77B29F', '#005D63']
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                closeModal();
            }}>
            <View style={styles.centeredView}>

                <View style={styles.outerBoderPopup}>
                    <View style={[styles.innerBoderPopup, { width: windowWidth * 0.8 }]}>

                        <View style={styles.eventContainer}>
                            <Text style={styles.eventTitle}>Events</Text>
                        </View>

                        <Text style={styles.eventText}>{title}</Text>
                        {
                            choices.map((choice, index) => {
                                return (
                                    <View key={index} style={styles.buttonOutterContainer}>
                                        <LinearGradient
                                            colors={gradientColor}
                                            style={[styles.gradient, { width: windowWidth * 0.6 }]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                        >
                                            <Pressable
                                                style={styles.button}
                                                onPress={() => handleChoice(choice)}>
                                                <Text style={styles.textButtonStyle}>{choice.description}</Text>
                                            </Pressable>
                                        </LinearGradient>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SelectionPopup;

