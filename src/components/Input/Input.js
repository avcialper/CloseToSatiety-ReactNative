import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' // Icon package
import styles from './Input.style'

export default ({ placeholder, text, onChangeText, firstIcon, secondIcon, isSecure = false, changeableIcon = false }) => {

    const [secure, setSecure] = useState(isSecure)
    const [icon, setIcon] = useState(firstIcon)

    // If the icons can change, they change when u press the icon
    const changeIcon = () => {
        if (changeableIcon) {
            if (icon === secondIcon) {
                setIcon(firstIcon)
                setSecure(true)
            } else {
                setIcon(secondIcon)
                setSecure(false)
            }
        }
    }

    return (
        <View style={styles.container} >
            <TextInput
                autoCapitalize='none'
                style={styles.input}
                value={text}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={'grey'}
                secureTextEntry={secure} />
            <Icon style={styles.icon} name={icon} onPress={changeIcon} />
        </View>
    )
}