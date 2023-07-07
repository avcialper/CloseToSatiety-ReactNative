import React from 'react'
import { View, Image, Text } from 'react-native'
import { Marker } from 'react-native-maps'
import { GOOGLE_API } from '@env'
import styles from './RestaurantMarker.style'

export default ({ restaurant, onPress }) => {
    return (
        <Marker
            coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng
            }}
            onPress={() => onPress(
                {
                    lat: restaurant.geometry.location.lat,
                    long: restaurant.geometry.location.lng
                },
                'restaurant',
                {
                    address: restaurant.formatted_address,
                    name: restaurant.name,
                    photoURL: restaurant.photos[0].photo_reference === undefined ? null : restaurant.photos[0].photo_reference ,
                    openNow: restaurant.opening_hours.open_now === undefined ? null : restaurant.opening_hours.open_now,
                    rating: restaurant.rating,
                    ratingTotal: restaurant.user_ratings_total,
                    icon: restaurant.icon
                })}
        >
            <View style={styles.container} >
                <Image
                    source={{
                        uri: restaurant.photos[0].photo_reference === undefined ? 'https://www.shutterstock.com/image-vector/restaurant-logo-food-service-vector-600w-454784548.jpg' :
                         `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${restaurant.photos[0].photo_reference}&key=${GOOGLE_API}`
                    }}
                    style={styles.image}
                />
            </View>
        </Marker>
    )
}