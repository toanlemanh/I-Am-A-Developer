import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { styles } from '../../styles/componentStyles/AlertPopStyle';
function AlertPopup({ modalVisible, closeModal, title, content, buttonText, buttonOnPress }) {
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

                    <Pressable
                        style={styles.cancelIcon}
                        onPress={closeModal}>
                        <Text style={styles.cancelIconText}>✖️</Text>
                    </Pressable>

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
                                onPress={buttonOnPress || closeModal}>
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

