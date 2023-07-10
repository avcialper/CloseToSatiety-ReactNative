import React from 'react'
import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './SettingButton.style'

export default () => {
    return (
        <Pressable style={styles.container} onPress={() => console.log("settings")}>
            <Icon name='account-settings' size={32} color={'white'} />
        </Pressable>
    )
}