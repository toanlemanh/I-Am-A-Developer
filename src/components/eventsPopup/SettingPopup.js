import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
                        <View style={{ width: 200 }}>
                            <Text style={styles.eventTitle}>Cúc à?</Text>
                        </View>
                        {/* <Text style={styles.eventText}>Do you fap with your step sister pant ?</Text> */}
                        <View style={{ padding: 8 }}>
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
                        <View style={{ padding: 8 }}>
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

                        <View style={{ padding: 8 }}>
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

                        <View style={{ padding: 8 }}>
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

const styles = StyleSheet.create({
    //modal frame
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    outerBoderPopup: {
        // flex: 1,
        margin: 20,
        backgroundColor: '#F0E5E5',
        borderRadius: 20,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 2,
        // width: 230,
    },

    innerBoderPopup: {
        // flex: 1,
        margin: 5,
        backgroundColor: '#F0E5E5',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // elevation: 5,
        borderWidth: 1,
        width: 230,
    },
    gradient: {
        borderRadius: 20,
        width: 200,
        overflow: 'hidden',
        elevation: 2,

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        // backgroundColor: '#3a97de',
        width: 200
    },
    textButtonStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    eventTitle: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'

    },
    eventText: {
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500'
    },
});