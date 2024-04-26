import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../Style/componentStyle/popupStyle/AlertPopStyle';
function AlertPopup({ modalVisible, closeModal,title,content,buttonText }) {
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

                        <View style={styles.insideModal}>
                            <Text style={styles.eventTitle}>{title}</Text>
                            <Text style={styles.eventText}>{content}</Text>
                        </View>

                        <LinearGradient
                            colors={['#4facfe', '#00f2fe']}
                            style={styles.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >

                            <Pressable
                                style={styles.button}
                                onPress={closeModal}>
                                <Text style={styles.textButtonStyle}>{buttonText}</Text>
                            </Pressable>

                        </LinearGradient>

                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default AlertPopup;

