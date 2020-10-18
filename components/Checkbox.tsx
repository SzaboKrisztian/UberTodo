import * as React from 'react';
import { FlexStyle, FontVariant, TextStyle, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";

type Props = {
    value?: boolean,
    onValueChange: (newValue: boolean) => void,
    style: FlexStyle,
    size?: number,
    color?: string
}

export const Checkbox = (props: Props) => {
    const [value, setValue] = useState(props.value || false);

    useEffect(() => props.onValueChange(value), [value]);

    return (
        <TouchableOpacity
            style={ props.style }
            activeOpacity={ 0.8 }
            onPress={ () => setValue(!value) }>
            <MaterialCommunityIcons
                name={ value ? 'checkbox-marked-outline' : 'checkbox-blank-outline' }
                size={ props.size }
                color={ value ? '#999' : '#000' }/>
        </TouchableOpacity>
    )
}
