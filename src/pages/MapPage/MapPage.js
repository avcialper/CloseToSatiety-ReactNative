import React from 'react'
import { View, ActivityIndicator, BackHandler, LogBox } from 'react-native'
import MapView from 'react-native-maps'
import useFetch from '../../hooks/useFetch'
import SearchBar from '../../components/SearchBar'
import UserMarker from '../../components/markers/UserMarker'
import RestaurantModal from '../../components/modals/RestaurantModal'
import DirectionInfoCard from '../../components/DirectionInfoCard'
import RestaurantMarker from '../../components/markers/RestaurantMarker'
import RoadLine from '../../components/RoadLine'
import UserButton from '../../components/UserButton'
import styles from './MapPage.style'
import { renderRestaurantMarkers, requestLocationPermission } from '../../utils/functions'

export default () => {

    const [userCoordinate, setUserCoordinate] = React.useState({ lat: 37.78, long: -122.43 })
    const [restaurantData, setRestaurantData] = React.useState(null)
    const [restaurantModalVisible, setRestaurantModalVisible] = React.useState(false)
    const [roadData, setRoadData] = React.useState({ distance: null, duration: null })
    const [drawTheWay, setDrawTheWay] = React.useState(false)

    React.useEffect(() => {
        const getLocation = async () => {
            const location = await requestLocationPermission()
            setUserCoordinate(location ? location : { lat: 37.78, long: -122.43 })
            handleMarkerClick(location, "user")
        }
        getLocation()
    }, [])

    const { data, loading, error } = useFetch(userCoordinate)
    const mapRef = React.useRef()

    const handleMarkerClick = (coordinates = userCoordinate, type, restaurantData = null) => {
        mapRef.current.animateToRegion({
            latitude: coordinates.lat,
            longitude: coordinates.long,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        })
        if (type === 'restaurant') {
            setRestaurantData(restaurantData)
            setRestaurantModalVisible(true)
            setDrawTheWay(false)
        }
    }

    const handleWayData = (result, isDone = true) => {
        if (isDone) {
            mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                    right: 50,
                    left: 50,
                    bottom: 50,
                    top: 50
                }
            })
            setRoadData({
                coordinates: result.coordinates,
                distance: result.distance,
                duration: result.duration
            })
        } else {
            setDrawTheWay(false)
        }
    }

    if (error) return BackHandler.exitApp()

    if (loading) return <ActivityIndicator size={50} style={styles.indicator} color={'black'} />

    return (
        <View style={styles.container} >
            <MapView
                ref={mapRef}
                initialRegion={{
                    latitude: userCoordinate.lat,
                    longitude: userCoordinate.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}
                onUserLocationChange={() => console.log("change")}
            >
                <UserMarker coordinate={userCoordinate} />
                {data && renderRestaurantMarkers(data, handleMarkerClick)}
                {restaurantData && <RestaurantMarker onPress={handleMarkerClick} restaurant={restaurantData} key={restaurantData.place_id} />}
                {restaurantData && drawTheWay && <RoadLine
                    userCoordinate={userCoordinate}
                    restaurantData={restaurantData}
                    handleWayData={(result, isDone) => handleWayData(result, isDone)}
                />}
            </MapView>
            {restaurantData && <RestaurantModal
                data={restaurantData}
                isVisible={restaurantModalVisible}
                closeRestaurantModal={() => setRestaurantModalVisible(false)}
                onDirectionButtonPress={() => {
                    setDrawTheWay(true)
                    setRestaurantModalVisible(false)
                }} />}
            {drawTheWay && <DirectionInfoCard
                data={roadData}
                centerTheWay={() => handleWayData(roadData)}
                deleteWay={() => setDrawTheWay(false)} />}
            <UserButton onPress={() => handleMarkerClick(userCoordinate, 'user')} />
            <SearchBar handleLocation={handleMarkerClick} />
        </View>
    )
}
