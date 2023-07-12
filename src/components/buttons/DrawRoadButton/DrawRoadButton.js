import React from 'react'
import { Pressable, Image } from 'react-native'

export default ({ onDirectionButtonPress }) => {
    return (
        <Pressable style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: 'rgba(0, 0,  0, 0.5)',
            marginHorizontal: 8,
            padding: 8
        }} onPress={onDirectionButtonPress} >
            <Image source={require('../../../assets/direction.png')} />
        </Pressable>
    )
}