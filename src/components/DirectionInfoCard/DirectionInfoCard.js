import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import styles from './DirectionInfoCard.style'

export default ({ data, centerTheWay, deleteWay }) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.textContainer} onPress={centerTheWay} >
                <Text style={styles.text} >Distance: {Number(data?.distance).toFixed(1)} km</Text>
                <Text style={styles.text} >Duration: {Number(data?.duration).toFixed(1)} min</Text>
            </Pressable>
            <Pressable style={styles.icon} onPress={deleteWay} >
                <Image source={require('../../assets/wrongWay.png')} />
            </Pressable>
        </View>
    )
}