import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { styles } from '../../Style/componentStyle/popupStyle/SelectPopStyle';
function SelectionPopup({
    modalVisible,
    closeModal,
    title,
    choice1,
    choice2,
    choice3,
    handleChoice1,
    handleChoice2,
    handleChoice3

}) {
    const { width: windowWidth } = useWindowDimensions()
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
                            <Text style={styles.eventTitle}>New Age event!</Text>
                        </View>

                        <Text style={styles.eventText}>{title}</Text>

                        <View >
                            <LinearGradient
                                colors={['#005D63', '#77B29F', '#005D63']}
                                style={[styles.gradient, { width: windowWidth * 0.6 }]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                <Pressable
                                    style={styles.button}
                                    onPress={handleChoice1}>
                                    <Text style={styles.textButtonStyle}>{choice1}</Text>
                                </Pressable>
                            </LinearGradient>
                        </View>

                        <View style={styles.buttonOutterContainer}>
                            <LinearGradient
                                colors={['#005D63', '#77B29F', '#005D63']}
                                style={[styles.gradient, { width: windowWidth * 0.6 }]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                <Pressable
                                    style={styles.button}
                                    onPress={handleChoice2}>
                                    <Text style={styles.textButtonStyle}>{choice2}</Text>
                                </Pressable>
                            </LinearGradient>

                        </View>

                        {choice3 != null && (
                            <View style={styles.buttonOutterContainer}>
                                <LinearGradient
                                    colors={['#005D63', '#77B29F', '#005D63']}
                                    style={[styles.gradient, { width: windowWidth * 0.6 }]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >

                                    <Pressable
                                        style={styles.button}
                                        onPress={handleChoice3}>
                                        <Text style={styles.textButtonStyle}>{choice3}</Text>
                                    </Pressable>
                                </LinearGradient>

                            </View>
                        )}

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SelectionPopup;

