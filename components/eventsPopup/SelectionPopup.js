import React from 'react';
import { Modal, Text, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../Style/componentStyle/popupStyle/SelectPopStyle';
function SelectionPopup({ modalVisible, closeModal,title,choice1,choice2,choice3 }) {
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

                        <Text style={styles.eventText}>{title}</Text>

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
                                    <Text style={styles.textButtonStyle}>{choice1}</Text>
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
                                    <Text style={styles.textButtonStyle}>{choice2}</Text>
                                </Pressable>
                            </LinearGradient>

                        </View>
                    
                        {choice3 !=null&&(
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

