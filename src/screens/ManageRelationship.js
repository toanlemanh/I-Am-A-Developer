import { useLayoutEffect } from "react";
import { View,Text,StyleSheet,ScrollView } from "react-native";
import Card from "../components/Card";
import CustomDataLabel from "../components/CustomDataLabel";

export default function ManageRelationship({route,navigation}){

    
    const actions =['suck my dick','play lol','Kiss', 'Invite drinking','action 4','Playing football','Do some thing']
    const name = route.params.dataName;
    
    useLayoutEffect(()=>{
        const group = route.params.group;
  
        navigation.setOptions({
            title: group.toUpperCase(),

        })
    })
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Card barHidden={true} showDetail={true}>{name}</Card>
            <CustomDataLabel>Action List</CustomDataLabel>
            <View style={styles.actionsContainer}>
                {actions.map((action, index) => (
                    <Card key={index} barHidden={true} showDetail={true}>
                        {action}
                    </Card>
                ))}
            </View>
        </ScrollView>
    )
}

const styles =StyleSheet.create({
    container:{
        flexGrow: 1,
        backgroundColor:'#FFF1E7',
        alignItems: 'center',
    },
    actionsContainer: {
        width: '100%',
        alignItems: 'center',
    },
})
