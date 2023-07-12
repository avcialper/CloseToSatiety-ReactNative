import React from 'react'
import { View, Image } from 'react-native'
import { Marker } from 'react-native-maps' // Map package - map marker
import styles from './RestaurantMarker.style'

export default ({ restaurant, onPress }) => {
    return (
        <Marker
            coordinate={{
                latitude: restaurant.lat,
                longitude: restaurant.long
            }}
            onPress={() => onPress(     // To catch selected restaurant data
                {
                    lat: restaurant.lat,
                    long: restaurant.long
                },
                'restaurant',
                restaurant
            )}
        >
            <View style={styles.container} >
                <Image source={{ uri: restaurant.photoURL }} style={styles.image} />
            </View>
        </Marker>
    )
}