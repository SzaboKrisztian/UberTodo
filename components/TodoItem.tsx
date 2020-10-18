import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Checkbox } from "./Checkbox";

export type Todo = {
    id: number,
    description: string,
    completed: boolean,
}

type Props = {
    data: Todo,
    changeCompleted: (id: number, value: boolean) => void
}

export const TodoItem = (props: Props) => {
    const [completed, setCompleted] = useState(props.data.completed);
    const [description] = useState(props.data.description);

    const onCompletedChanged = (newValue: boolean) => {
        setCompleted(newValue);
        props.changeCompleted(props.data.id, newValue);
    }

    return (
        <View style={ styles.container }>
            <Checkbox
                style={ styles.checkbox }
                value={ completed }
                size={ 24 }
                onValueChange={ (newValue) => onCompletedChanged(newValue) }/>
            <Text
                style={ [ styles.text, completed ? styles.textCompleted : styles.textNormal ] }>
                { description }
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 4
    },
    checkbox: {
        flexGrow: 0,
        flexShrink: 0
    },
    text: {
        paddingTop: 3,
        paddingLeft: 8,
        flexGrow: 1
    },
    textCompleted: {
        textDecorationLine: 'line-through',
        color: '#999999'
    },
    textNormal: {
        textDecorationLine: 'none',
        color: '#000000'
    }
});
