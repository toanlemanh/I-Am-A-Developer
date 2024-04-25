import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { UserContext } from '../context/user-context';
const TestData = ({ userid, collection }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [currentKey, setCurrentKey] = useState(null);
    const user = useContext(UserContext)

    const userData = user.userState
    let current = {}
    const BACKEND_URL =
        'https://i-am-a-developer-30661-default-rtdb.asia-southeast1.firebasedatabase.app/';
    // axios.post(BACKEND_URL + `/${userData.id}.json`, userData);
    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get(BACKEND_URL + `/${userData.id}.json`)
                    .then(response => {
                        // Parse response data into an object
                        current = Object.values(response.data)[0]
                        setData(current)
                        user.updateUser(current)
                        user.updateCharacterStatus({
                            happiness: 10,
                            health: 2,
                            look: 30
                        })
                        setCurrentKey(Object.keys(response.data)[0])
                        console.log(currentKey + 'as')
                    })

            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()

        return () => {

        }
    }, [])

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const fetchedData = await fetchData('user1id', 'characters');
    //             setData(fetchedData);
    //         } catch (err) {
    //             setError(err);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     getData();
    // }, [userid, collection]);
    const updateData = () => {
        console.log('loop')
        if (currentKey) {
            axios.put(BACKEND_URL + `/${userData.id}/${currentKey}.json`, userData);
        }
    }
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View>
            <Text>User data id: {userData.id}</Text>
            <Text>Key: {currentKey}</Text>
            <Text>Status:</Text>
            <Text>Happiness: {userData.status.happiness}</Text>
            <Text>Health: {userData.status.health}</Text>
            <Text>Look: {userData.status.look}</Text>
            <Button title='UpdateData' onPress={updateData}></Button>
        </View>
    );
};

export default TestData;
