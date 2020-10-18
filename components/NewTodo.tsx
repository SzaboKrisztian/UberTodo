import * as React from 'react';
import { useState } from 'react';
import {
    FlexStyle,
    NativeSyntheticEvent,
    NativeTouchEvent,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Entypo } from '@expo/vector-icons';


type Props = {
    saveItem: (description: string) => void,
    style: FlexStyle
}

export const NewTodo = (props: Props) => {
    const [description, setDescription] = useState('');
    let input: TextInput | null = null;

    const handlePress = (ev: NativeSyntheticEvent<NativeTouchEvent>) => {
        if (description.length > 0) {
            props.saveItem(description);
            clearInput();
        }
    }

    const clearInput = () => {
        if (input != null) {
            input.clear();
            setDescription('');
        }
    }

    return (
        <View style={ [props.style, styles.container] }>
            <View style={ styles.inputAndClear }>
                <View style={ styles.inputContainer }>
                    <TextInput
                        ref={ (el) => { input = el; } }
                        placeholder={ 'Enter a title' }
                        style={ styles.input }
                        onChangeText={ text => setDescription(text) }
                        value={ description }/>
                </View>
                <TouchableOpacity onPress={ clearInput } activeOpacity={0.8}>
                    <View style={ styles.clear }>
                        <Text style={ styles.clearText }>X</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={ handlePress } activeOpacity={0.8}>
                <View style={ styles.button }>
                    <Entypo name="add-to-list" size={20} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f99',
        flexGrow: 0,
        height: 40,
        flexDirection: 'row'
    },
    inputAndClear: {
        // backgroundColor: '#9f9',
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 5,
        marginRight: 5,
        alignItems: 'center',
    },
    inputContainer: {
        flexGrow: 1,
        // backgroundColor: '#99f',
        marginHorizontal: 5,
        flexDirection: 'column'
    },
    input: {
        flexGrow: 0,
        flexShrink: 0
    },
    clear: {
        // backgroundColor: '#ff9',
        flexGrow: 0,
        marginRight: 10
    },
    clearText: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#999999',
        color: '#999999',
        paddingHorizontal: 5,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexGrow: 1,
        flexShrink: 1,
        borderRadius: 5,
        backgroundColor: '#66f',
        justifyContent: 'center'
    }
});
