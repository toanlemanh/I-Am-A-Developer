import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { styles } from '../../Style/componentStyle/popupStyle/SettingPopStyle';
function SettingPopup({ modalVisible, closeModal }) {
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
                            <Text style={styles.eventTitle}>Cúc à?</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <LinearGradient
                                colors={['#005D63', '#77B29F', '#005D63']}
                                style={styles.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Pressable
                                    style={styles.button}
                                    onPress={closeModal}>
                                    <Text style={styles.textButtonStyle}>Ừ</Text>
                                </Pressable>
                            </LinearGradient>
                        </View>
                        <View >
                            <LinearGradient
                                colors={['#005D63', '#77B29F', '#005D63']}
                                style={styles.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                <Pressable
                                    style={styles.button}
                                    onPress={closeModal}>
                                    <Text style={styles.textButtonStyle}>đổi account cái</Text>
                                </Pressable>
                            </LinearGradient>

                        </View>

                        <View style={styles.buttonContainer}>
                            <LinearGradient
                                colors={['#005D63', '#77B29F', '#005D63']}
                                style={styles.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                <Pressable
                                    style={styles.button}
                                    onPress={closeModal}>
                                    <Text style={styles.textButtonStyle}>Từ đã</Text>
                                </Pressable>
                            </LinearGradient>

                        </View>

                        <View style={styles.buttonContainer}>
                            <LinearGradient
                                colors={['#005D63', '#77B29F', '#005D63']}
                                style={styles.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                <Pressable
                                    style={styles.button}
                                    onPress={closeModal}>
                                    <Text style={styles.textButtonStyle}>Làm 1 con tinh trùng mới</Text>
                                </Pressable>
                            </LinearGradient>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default SettingPopup;
