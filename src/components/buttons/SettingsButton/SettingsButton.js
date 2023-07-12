import React from 'react'
import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' // Icon package
import styles from './SettingButton.style'

export default ({ onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Icon name='account-settings' size={32} color={'white'} />
        </Pressable>
    )
}