import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal, Pressable, Text, View,useWindowDimensions } from 'react-native';
import { styles } from '../../styles/componentStyles/SettingPopStyle';
function SettingPopup({ modalVisible, closeModal,title,choices,handleChoice }) {
    const { width: windowWidth } = useWindowDimensions()
    const gradientColor = ['#CC0000','#FF7B7B','#CC0000'];
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

                    <View style={[styles.innerBoderPopup,{ width: windowWidth * 0.8 }]}>
                        <View style={styles.eventContainer}>
                            <Text style={styles.eventTitle}>Danger Events ! </Text>
                        </View>
                        <Text style={styles.eventText}>{title}</Text>
                        {choices.map((choice,index)=>{
                            return(
                                <View key={index} style={styles.buttonContainer}>
                                    <LinearGradient
                                        colors={gradientColor}
                                        style={[styles.gradient, { width: windowWidth * 0.5 }]}
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
                        })}
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default SettingPopup;
