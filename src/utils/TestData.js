import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { fetchData } from '../controllers/UserController';
const TestData = ({ userid, collection }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData('user1id', 'characters');
                setData(fetchedData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [userid, collection]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View>
            <Text>Name: {data?.name}</Text>
            <Text>Age: {data?.age}</Text>
        </View>
    );
};

export default TestData;
