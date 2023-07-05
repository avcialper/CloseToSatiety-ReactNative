import React from 'react'
import { View, Text, ActivityIndicator, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import useFetch from '../../hooks/useFetch'
import SearchBar from '../../components/SearchBar'
import UserMarker from '../../components/marker/UserMarker'
import RestaurantMarker from '../../components/marker/RestaurantMarker'
import UserButton from '../../components/UserButton'
import styles from './MapPage.style'
import { renderRestaurnatMarkers } from '../../utils/functions'

export default () => {

    const [coordinate, setCoordinate] = React.useState({ lat: 37.78, long: -122.43 })

    const { data, loading, error } = useFetch(coordinate)

    const mapRef = React.useRef()

    const handleLocation = (lat, lng) => setCoordinate({lat: lat, long: lng})
    const handleMarkerClick = (coordinates = coordinate, type = 'restaurant') => {
        mapRef.current.animateToRegion({
            latitude: coordinates.lat,
            longitude: coordinates.long,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        })
        if(type === 'restaurant') {
            console.log("restaurant")
        }
    }

    if (loading) return <ActivityIndicator size={50} style={styles.indicator} color={'black'} />

    return (
        <View style={styles.container} >
            <MapView
                ref={mapRef}
                initialRegion={{
                    latitude: coordinate.lat,
                    longitude: coordinate.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}
            >
                <UserMarker coordinate={coordinate} />
                {data && renderRestaurnatMarkers(data, handleMarkerClick)}
            </MapView>
            <UserButton onPress={() => handleMarkerClick(coordinate, 'user')} />
            <SearchBar handleLocation={handleLocation} />
        </View>
    )
}
