import React, { useContext } from 'react'
import { ScrollView, View } from 'react-native'
import { styles } from '../Style/screenStyles/RelationshipStyle'
import Card from '../components/Card'
import CustomDataLabel from '../components/CustomDataLabel'
import { UserContext } from '../context/user-context'

export default function RelationshipScreen({ navigation }) {
  // Grouping relationships by group name
  const userContext = useContext(UserContext);
  const relationships2 = userContext.userState.relationships;

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
        <View key={index} style={styles.insideScrollView}>
          <CustomDataLabel>{group}</CustomDataLabel>
          {groupItems.map((item, itemIndex) => (
            <Card
              time={itemIndex}
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

