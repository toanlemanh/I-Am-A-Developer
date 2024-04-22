import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Card from "../components/Card";
import CustomDataLabel from "../components/CustomDataLabel";
import { SpendTime } from "../utils/ManageActions";
export default function ManageRelationship({ route, navigation }) {


    const actions = ['suck my dick', 'play lol', 'Kiss', 'Invite drinking', 'action 4', 'Playing football', 'Do some thing']
    const name = route.params.dataName;
    const type = route.params.relationshipType;
    const level = route.params.relationshipLevel;
    const job = route.params.occupation;


    useLayoutEffect(() => {
        const group = route.params.group;

        navigation.setOptions({
            title: group.toUpperCase(),

        })
    })
    function log() {
        console.log("name : ", name, "type:", type, "level:", level, "job:", job);
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card barHidden={true} showDetail={true} onPress={log} >{name}</Card>
            <Text>{type},{level},{job}</Text>
            <CustomDataLabel>Action List</CustomDataLabel>
            <Card barHidden={true} showDetail={true} onPress={() => SpendTime}>
                Spend Time With
            </Card>
            <View style={styles.actionsContainer}>
                {() => SpendTime(name)}
                {actions.map((action, index) => (
                    <Card key={index} barHidden={true} showDetail={true}>
                        {action}
                    </Card>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFF1E7',
        alignItems: 'center',
    },
    actionsContainer: {
        width: '100%',
        alignItems: 'center',
    },
})
