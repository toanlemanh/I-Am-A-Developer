import { useContext, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { styles } from '../styles/screenStyles/AssetsScreenStyle';
import Card from '../components/Card';
import CustomDataLabel from '../components/CustomDataLabel';
import AlertPopup from '../components/eventsPopup/AlertPopup';
import data from '../data/userData.json';
import { UserContext } from '../store/user-context';
import { buy } from '../utils/transaction';

export default function AssetScreen() {
  const userContext = useContext(UserContext);
  const money = userContext.userState.character.money;
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
  function handleTransaction(name, price) {
    let message = buy(money, name, price);
    if (message) {
      // console.log(message);
      userContext.updateCharacterMoney(price);
      userContext.updateAsset(name);
      Alert.alert("Successful!", message);
      closeModal();
    }
    else {
      console.log("Eorr trans")
    }
  }

  const renderContent = (name, price) => {
    return (
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
                time={itemIndex}
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
        content={renderContent(selectedAsset?.name, selectedAsset?.price)}
        buttonText={buttonText(selectedAsset?.group)}
        buttonOnPress={() => handleTransaction(selectedAsset?.name, selectedAsset?.price)}
      />
    </ScrollView>
  );
}

