import React from 'react';
import { Modal, Text, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../Style/componentStyle/popupStyle/SelectPopStyle';
function SelectionPopup({ modalVisible, closeModal }) {
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
                    <View style={styles.innerBoderPopup}>

                        <View style={styles.eventContainer}>
                            <Text style={styles.eventTitle}>New Age event!</Text>
                        </View>

                        <Text style={styles.eventText}>Do you fap with your step sister pant ?</Text>

                        <View style={{  }}>
                            <LinearGradient
                                colors={['#005D63', '#77B29F', '#005D63']}
                                style={styles.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                <Pressable
                                    style={styles.button}
                                    onPress={closeModal}>
                                    <Text style={styles.textButtonStyle}>Why not?</Text>
                                </Pressable>
                            </LinearGradient>
                        </View>

                        <View style={styles.buttonOutterContainer}>
                            <LinearGradient
                                colors={['#005D63', '#77B29F', '#005D63']}
                                style={styles.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                <Pressable
                                    style={styles.button}
                                    onPress={closeModal}>
                                    <Text style={styles.textButtonStyle}>That's my favor</Text>
                                </Pressable>
                            </LinearGradient>

                        </View>

                        <View style={styles.buttonOutterContainer}>
                            <LinearGradient
                                colors={['#005D63', '#77B29F', '#005D63']}
                                style={styles.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                <Pressable
                                    style={styles.button}
                                    onPress={closeModal}>
                                    <Text style={styles.textButtonStyle}>No way I do that sh*t</Text>
                                </Pressable>
                            </LinearGradient>

                        </View>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SelectionPopup;

