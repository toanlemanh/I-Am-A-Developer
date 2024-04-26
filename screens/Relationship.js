import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Card from '../components/Card'
import CustomDataLabel from '../components/CustomDataLabel'
import data from "../data/userData.json"

const relationships2 = data.Relationships

export default function RelationshipScreen({ navigation }) {
  // Grouping relationships by group name
  const groupedRelationships = relationships2.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = []
    }
    acc[item.group].push(item)
    return acc
  }, {})

  function handleCard(group, name, relationshipType, relationshipLevel, occupation) {
    navigation.navigate('ManageRelationship', {
      group: group,
      dataName: name,
      relationshipType: relationshipType,
      relationshipLevel: relationshipLevel,
      occupation: occupation,

    })
  }
  return (
    <ScrollView style={styles.container}>
      {Object.entries(groupedRelationships).map(([group, groupItems], index) => (
        <View key={index} style={{ alignItems: 'center' }}>
          <CustomDataLabel>{group}</CustomDataLabel>
          {groupItems.map((item, itemIndex) => (
            <Card
              key={itemIndex}
              onPress={() => handleCard(group, item.name, item.relationshipType, item.relationshipLevel, item.occupation)}
              percentage={item.relationshipLevel}
              showDetail={false}
            >
              {item.name} ({item.relationshipType})
            </Card>
          ))}
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF1E7'
  },
})