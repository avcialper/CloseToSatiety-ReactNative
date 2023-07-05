import React from 'react'
import { View, Image, Text } from 'react-native'
import { Marker } from 'react-native-maps'
import { GOOGLE_API } from '@env'
import styles from './RestaurantMarker.style'

export default ({ coordinate, photoURL, onPress }) => {
    return (
        <Marker
            coordinate={{
                latitude: coordinate.lat,
                longitude: coordinate.long
            }}
            onPress={() => onPress({
                latitude: coordinate.lat,
                longitude: coordinate.long
            }, 'restaurant')}
        >
            <View style={styles.container} >
                <Image
                    source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${photoURL}&key=${GOOGLE_API}` }}
                    style={styles.image}
                />
            </View>
        </Marker>
    )
}