import React from 'react'
import { Pressable, Image } from 'react-native'
import styles from './UserButton.style'

export default ({ onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container} >
            <Image source={require('../../../assets/bigUser.png')} />
        </Pressable>
    )
}