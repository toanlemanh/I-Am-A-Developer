import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
import CustomDataLabel from '../components/CustomDataLabel';
import data from '../data/userData.json';
import { useState } from 'react';
import AlertPopup from '../components/eventsPopup/AlertPopup';
import { styles } from '../Style/screenStyles/AssetsScreenStyle';


export default function AssetScreen() {
  const assets = data.Properties.assets;
  const [selectedAsset, setSelectedAsset] = useState(null); // Track currently selected asset
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (asset) => {
    setSelectedAsset(asset); // Set the selected asset before opening modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAsset(null); // Clear selected asset on close
  };

  const groupedAssets = assets.reduce((acc, item) => {

    if (!acc[item.group]) {

      acc[item.group] = [];

    }

    acc[item.group].push(item);

    return acc;

  }, {});

  const buttonText = (text) => {
    return <Text>  Buy now {text} </Text>; 
  };
  
  const renderContent =(name,price)=>{
    return(
      <View>
        <Text><Text style={styles.label}>Brand Name: :</Text> {name}</Text>
         <Text><Text style={styles.label}>Price:</Text> {price}</Text>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      {Object.entries(groupedAssets).map(([group, groupItems], index) => (
        <View key={index} style={styles.innerScrollView}>
          <CustomDataLabel>{group}</CustomDataLabel>
          {groupItems.map((item, itemIndex) => (
            <View key={itemIndex}>
              <Card
                key={itemIndex}
                onPress={() => openModal(item)} 
                barHidden={true}
                showDetail={true}
              >
                {item.name}
              </Card>
            </View>
          ))}
        </View>
      ))}
      <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={selectedAsset?.group} 
        content={renderContent(selectedAsset?.name,selectedAsset?.price)}
        buttonText={buttonText(selectedAsset?.group)}
      />
    </ScrollView>
  );
}

