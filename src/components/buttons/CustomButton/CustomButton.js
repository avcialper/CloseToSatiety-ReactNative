import React from 'react'
import { Pressable, Text } from 'react-native'
import styles from './CustomButton.style'

export default ({ onPress, title }) => {
    return (
        <Pressable style={styles.container} onPress={onPress} >
            <Text style={styles.title} >{title}</Text>
        </Pressable>
    )
}