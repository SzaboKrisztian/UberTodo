import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform, Text, View, TouchableOpacity, Alert } from 'react-native';
import { TodoList } from "./components/TodoList";
import { Todo } from "./components/TodoItem";
import { NewTodo } from "./components/NewTodo";
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';

const DATA_KEY = 'todo-data';

const loadData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(DATA_KEY);
        return Promise.resolve(jsonValue != null ? JSON.parse(jsonValue) : generateStartingData());
    } catch (e) {
        return Promise.resolve(generateStartingData());
    }
}

const generateStartingData = (): Todo[] => {
    return [
        {
            id: 0,
            description: 'Buy eggs',
            completed: true,
        },
        {
            id: 1,
            description: 'Make omelette',
            completed: false,
        },
        {
            id: 2,
            description: 'Take over the world',
            completed: false,
        },
    ];
}

export default function App() {
    const [data, setData] = useState([] as Todo[]);
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        const assignData = async () => {
            const loadedData = await loadData();
            setData(loadedData);
        }
        assignData()
            .then(() => {
                setCurrentId(data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 0);
            });
    }, []);

    useEffect(() => {
        storeData(data).then(() => {
        });
    }, [data]);

    const addTodo = (description: string) => {
        setData([...data, {
            id: currentId,
            completed: false,
            description
        }]);
        setCurrentId(currentId + 1);
    };

    const updateItem = (id: number, completed: boolean) => {
        const item = data.find(i => i.id === id);
        const itemIndex = data.findIndex(i => i.id === id);
        if (item) {
            const newItem = { ...item, completed };
            const newData = [...data.slice(0, itemIndex), newItem, ...data.slice(itemIndex + 1, data.length)];
            setData(newData);
        }
    }

    const storeData = async (data: Todo[]) => {
        // let numRetries = 0;
        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem(DATA_KEY, jsonValue);
        } catch (e) {
            // if (numRetries < 1) {
            //     AsyncStorage.removeItem(DATA_KEY)
            //         .then(() => {
            //         })
            //         .catch(() => {
            //         })
            //         .finally(() => {
            //             numRetries += 1;
            //             storeData(data);
            //         });
            // }
        }
    }

    const clearDone = () => {
        Alert.alert(
            'Are you sure?',
            'This will permanently delete all the done todos',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        setData(data.filter(i => !i.completed));
                        storeData(data).then(() => {
                        });
                    }
                }
            ],
            { cancelable: true }
        );

    }

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }>ÜberTodo</Text>
                <TouchableOpacity style={ styles.clearButton } onPress={ clearDone }>
                    <Feather name="wind" size={24} color="#666666" />
                </TouchableOpacity>
            </View>
            { data.length === 0 ?
                <Text style={ styles.listPlaceholder }>So much empty! Add your first todo by typing in the box
                    below.</Text> :
                <TodoList data={ data } style={ styles.list } changeCompleted={ updateItem }/>
            }
            <NewTodo saveItem={ addTodo } style={ styles.input }/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 8
    },
    headerContainer: {
        alignSelf: 'stretch',
        margin: 16,
        flexGrow: 0,
        flexShrink: 0
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'android' ? 'monospace' : '',
    },
    clearButton: {
        position: 'absolute',
        top: 5,
        right: 0
    },
    list: {
        flexGrow: 1
    },
    listPlaceholder: {
        flexGrow: 1,
        alignSelf: 'stretch',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 18,
        color: '#666'
    },
    input: {
        flexGrow: 0,
        flexShrink: 0
    }
});
