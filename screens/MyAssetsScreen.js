import { View, Text, StyleSheet, ScrollView, Alert, Image } from "react-native";
import Card from "../components/Card";
import CustomDataLabel from "../components/CustomDataLabel";
import { useState, useContext } from "react";
import AlertPopup from "../components/eventsPopup/AlertPopup";
import { styles } from "../Style/screenStyles/AssetsScreenStyle";
import { UserContext } from "../context/user-context";


export default function MyAssetScreen() {
  const userContext = useContext(UserContext);

  const assets = userContext.userState.assets;
  //   const [selectedAsset, setSelectedAsset] = useState(null); // Track currently selected asset
  //   const [modalVisible, setModalVisible] = useState(false);

  const openModal = (asset) => {
    setSelectedAsset(asset); // Set the selected asset before opening modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAsset(null); // Clear selected asset on close
  };

  //   const groupedAssets = assets.reduce((acc, item) => {

  //     if (!acc[item.group]) {

  //       acc[item.group] = [];

  //     }

  //     acc[item.group].push(item);

  //     return acc;

  //   }, {});

  const buttonText = (text) => {
    return <Text> OK {text} </Text>;
  };

  const renderContent = (name, price) => {
    return (
      <View>
        <Text>
          <Text style={styles.label}>Brand Name: :</Text> {name}
        </Text>
        <Text>
          <Text style={styles.label}>Price:</Text> {price}
        </Text>
      </View>
    );
  };
  if (assets.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.emptyContainer}>
            <Image style={styles.empty} source={require("../assets/images/empty-cart-girl.png")} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerScrollView}>
        {assets.length > 0 &&
          assets.map((item, id) => (
            <View key={id}>
              <Card
                key={id}
                //onPress={() => openModal(item)}
                barHidden={true}
                //showDetail={true}
              >
                {item}
              </Card>
            </View>
          ))}
      </View>
      {/* <AlertPopup
        modalVisible={modalVisible}
        closeModal={closeModal}
        title={selectedAsset?.group}
        content={renderContent(selectedAsset?.name, selectedAsset?.price)}
        buttonText={buttonText(selectedAsset?.group)}
      /> */}
    </ScrollView>
  );
}
