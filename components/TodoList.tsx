import * as React from 'react';
import { FlatList, FlexStyle, StyleSheet } from 'react-native';
import { Todo, TodoItem } from "./TodoItem";

type Props = {
    data: Todo[],
    changeCompleted: (id: number, value: boolean) => void
    style: FlexStyle
}

export const TodoList = (props: Props) => {
    const sort = (data: Todo[]): Todo[] => {
        const result: Todo[] = data.filter(i => !i.completed).sort(i => i.id);
        return result.concat(data.filter(i => i.completed).sort(i => i.id));
    }

    return (
        <FlatList
            style={ [props.style, styles.list] }
            data={ sort(props.data) }
            renderItem={({ item }) => <TodoItem data={ item } changeCompleted={ props.changeCompleted }/> }
            keyExtractor={(item) => item.id.toString() }/>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    list: {
        marginLeft: 4
    }
})
