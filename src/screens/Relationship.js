import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Card from '../components/Card';
import CustomDataLabel from '../components/CustomDataLabel';
import data from "../data/userData.json";
const relationships2 = data.Relationships
const relationships = [
  {
    group: "Parents",
    name: "vu dep",
    percentage: 10,
    age: 58,
    occupation: "doctor",
  },
  {
    group: "Siblings",
    name: "ngo van quyen",
    percentage: 80,
    age: 30,
    occupation: "teacher",
  },
  {
    group: "Friends",
    name: "dang dinh quan",
    percentage: 35,
    age: 32,
    occupation: "engineer",
  },
  {
    group: "Pets",
    name: "long (dog)",
    percentage: 90,
  },
  {
    group: "Friends",
    name: "Mai",
    percentage: 70,
    age: 28,
    occupation: "designer",
  },
  {
    group: "Pets",
    name: "Hai",
    percentage: 70,
    age: 20,
    occupation: "designer",
  },

];

export default function RelationshipScreen({ navigation }) {
  // Grouping relationships by group name
  const groupedRelationships = relationships2.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {});

  function handleCard(group, name) {
    navigation.navigate('ManageRelationship', {
      group: group,
      dataName: name,

    });
  }
  return (
    <ScrollView style={styles.container}>
      {Object.entries(groupedRelationships).map(([group, groupItems], index) => (
        <View key={index} style={{ alignItems: 'center' }}>
          <CustomDataLabel>{group}</CustomDataLabel>
          {groupItems.map((item, itemIndex) => (
            <Card
              key={itemIndex}
              onPress={() => handleCard(group, item.name)}
              percentage={item.relationshipLevel}
              showDetail={false}
            >
              {item.name} ({item.relationshipType})
            </Card>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 800,
    backgroundColor: '#FFF1E7'
    flexGrow: 1,
    backgroundColor: '#FFF1E7'
  },
});
