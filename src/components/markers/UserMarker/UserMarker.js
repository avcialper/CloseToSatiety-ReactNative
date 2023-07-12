import React from 'react'
import { Image } from 'react-native'
import { Marker } from 'react-native-maps' // Map package - map marker

export default ({ coordinate }) => {
    return (
        <Marker
            coordinate={{
                latitude: coordinate.lat,
                longitude: coordinate.long
            }}
        >
            <Image source={require('../../../assets/user.png')} />
        </Marker>
    )
}