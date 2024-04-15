import {View,Text,StyleSheet, FlatList,Pressable} from 'react-native'
import PercentageBar from '../components/ProgressBar'
import { useState } from 'react'
import CustomAvatar from '../components/CustomAvatar';
import { Ionicons,MaterialCommunityIcons,AntDesign,MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen(){
    const navigation = useNavigation();
    const [lifeStage ,setLifeStage] =useState('Infant'); 
    const data =[
        {
            id: '1',
            age: '0',
            event: 'Tối thứ 4(3/4) tầm 9h30 10h mình có để quên một chiếc loa màu nâu trên mui ô tô gần sau D3. Bạn nào nhặt được thì cho mình xin lại ạ'
        },
        {
            id: '2',
            age: '1',
            event: 'Tối thứ 4(3/4) tầm 9h30 10h mình có để quên một chiếc loa màu nâu trên mui ô tô gần sau D3. Bạn nào nhặt được thì cho mình xin lại ạ'
        },
        {
            id: '3',
            age: '2',
            event: 'Tối thứ 4(3/4) tầm 9h30 10h mình có để quên một chiếc loa màu nâu trên mui ô tô gần sau D3. Bạn nào nhặt được thì cho mình xin lại ạ'
        }
    ]
    function renderItem(data){
        return(
            <View style={styles.eventContainer} >
                <Text style={styles.ageText}> Age: {data.item.age} </Text>
                <Text style={styles.eventText}>{data.item.event}</Text>
            </View>
        )
    }
    
    return(
        <View style={styles.container}>
            {/* Level progress bar*/}
            <PercentageBar
                width={'100%'}
                height={12}
                backgroundColor={'#E0E9F2'}
                completedColor={'#EB9F4A'}
                percentage={90}
            />
            
            {/* Top container will contain avatar, age and balance*/}
            <View style={styles.topContainer} >
                <View style={styles.userInfo}>
                    <View >    
                        <CustomAvatar width={54} height={54}/>
                        <View style={styles.level}>
                                <Text>1</Text>  
                        </View>
                    </View>
                    <View style={{marginTop:17}}>
                        <Text style={styles.stageStyle}> {lifeStage}</Text>
                        <Text style={styles.username}>John Doe</Text>
                    </View>
                </View>
                <View>
                    <Text style={{fontWeight:300}}>Balance:</Text>
                    <Text style={styles.money}>$100</Text>
                </View>
            </View>

            {/* Container of user's events and different age */}
            <View style={styles.eventsContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item=>item.id}
                />
            </View>

            {/* Container of navigators and the status progress bar */}
            <View style={styles.underhalf}>
                <View style={styles.utility}>
                    <Pressable style={({pressed}) =>pressed&& styles.pressed} >
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <MaterialIcons name="work" size={24} color="black" />
                            <Text style={{fontSize:10}}>Occupation</Text>
                            </View>
                    </Pressable>
                    
                    <Pressable style={({pressed}) =>pressed&& styles.pressed} onPress={()=>{
                        navigation.navigate('Assets')
                    }}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <MaterialCommunityIcons name="sack" size={24} color="black" />
                            <Text style={{fontSize:10}}>Assets</Text>
                        </View>
                    </Pressable>
                    <View style={styles.outterContainer}>
                        <Pressable style={({pressed}) =>pressed&& styles.pressed}>
                            <View style={styles.buttonContainer}>
                                <Text style={{fontWeight:'600',color:'white',fontSize:24}}>+</Text>
                                <Text style={{fontWeight:'500',color:'white',fontSize:20}}>Age</Text>       
                            </View>    
                        </Pressable >
                    </View>
                    <Pressable style={({pressed}) =>pressed&& styles.pressed} onPress={()=>{
                        navigation.navigate('Relationship');
                    }}>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <AntDesign name="heart" size={24} color="black" />
                                <Text style={{fontSize:10}}>Relationship</Text>
                            </View>
                    </Pressable>

                    <Pressable style={({pressed}) =>pressed&& styles.pressed}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Ionicons name="school" size={24} color="black" />
                            <Text style={{fontSize:10}}>Education</Text>
                            </View>
                    </Pressable>
                </View>

                <View style={styles.allStatusContainer}>
                    <View style={styles.statusContainer} >
                        <Text  style={styles.ageText}>Happiness:</Text>
                        <PercentageBar
                            height={15}
                            backgroundColor='grey'
                            completedColor="#009A34"
                            percentage={75}
                            width={200}
                        />
                    </View>
                    <View style={styles.statusContainer} >
                        <Text  style={styles.ageText}>      Health:</Text>
                        <PercentageBar
                            height={15}
                            backgroundColor='grey'
                            completedColor="#EED817"
                            percentage={60}
                            width={200}

                        />
                    </View>
                    <View style={styles.statusContainer} >
                        <Text style={styles.ageText}>     Smart:</Text>
                        <PercentageBar
                            height={15}
                            backgroundColor='grey'
                            completedColor="#F12C23"
                            percentage={20}
                            width={200}

                        />
                    </View>
                    <View style={styles.statusContainer} >
                        <Text style={styles.ageText}>      Look:</Text>
                        <PercentageBar
                            height={15}
                            backgroundColor='grey'
                            completedColor="#FD7C1F"
                            percentage={30}
                            width={200}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFF1E7'
    },
    topContainer:{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        width:"100%",
        height:55,
        backgroundColor:'#FFFFFF',
        marginTop:-11

    },
    underhalf:{
        backgroundColor:'white',
        flex:1
      
    },
    userInfo:{
        flexDirection:'row',
        paddingLeft:40
        
    },
    level: {
        position: 'absolute', 
        right: 0, 
        bottom: 0, 
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'lightgrey',
        marginRight: -15, 
        marginBottom: -15, 
        justifyContent:'center',
        alignItems:'center'
      },
      username:{
        fontSize:20,
        fontWeight:'700',
        color:'#083C4C',   
    },
    money:{
        fontSize:20,
        marginRight:20,
        textAlign: 'center',
        fontWeight:'500',
        color:'#083C4C',       
    },
    ageText:{
        color:'darkblue',
        fontWeight:'bold',
        fontSize: 16,
    },
    eventText:{
        fontSize: 12,
        fontWeight:'300',    
    },
    eventContainer:{
        marginVertical:20,
    },
    eventsContainer:{
        height:387,
       
    },
    allStatusContainer:{
        width:'100%',
        height:205,
        justifyContent:'center',
    },
    ageContainer:{
        width:'100%',
        height:50,
        backgroundColor:'black'
    },
    statusContainer:{
        flexDirection:'row',
        justifyContent:'space-around',       
    },
    statusText:{
        fontWeight:'300',
        color:'darkblue'
    },
    stageStyle:{
        color:'#083C4C',
        fontSize:13,
        fontWeight:'300'
    },
    utility:{
        flexDirection:'row',
        width:'100%',
        height: 50,
        backgroundColor:'#EB9F4A',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    buttonContainer:{
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:'#2B9939',
        alignItems:'center',
        justifyContent:'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    pressed:{
        opacity:0.65
    },
    outterContainer:{
        width:76,
        height:76,borderRadius:38,backgroundColor:'white',justifyContent:'center',alignItems:'center',
        elevation:7,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }    
})