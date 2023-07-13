import React from 'react'
import { View, ActivityIndicator, BackHandler } from 'react-native'
import Geolocation from 'react-native-geolocation-service' // Location package
import MapView from 'react-native-maps' // Map package
import useFetch from '../../hooks/useFetch' // Fetch operation
import SearchBar from '../../components/SearchBar'  // Custom component
import UserMarker from '../../components/markers/UserMarker'    // Custom component
import RestaurantModal from '../../components/modals/RestaurantModal'   // Custom component
import DirectionInfoCard from '../../components/DirectionInfoCard'  // Custom component
import RestaurantMarker from '../../components/markers/RestaurantMarker'    // Custom component
import RoadLine from '../../components/RoadLine'    // Custom component
import UserButton from '../../components/buttons/UserButton'    // Custom component
import { renderRestaurantMarkers, requestLocationPermission } from '../../utils/functions' // Functions
import styles from './MapPage.style'

export default ({ navigation, route }) => {

    const [userCoordinate, setUserCoordinate] = React.useState({ lat: 37.78, long: -122.43 })
    const [restaurantData, setRestaurantData] = React.useState(null)
    const [restaurantModalVisible, setRestaurantModalVisible] = React.useState(false)
    const [roadData, setRoadData] = React.useState({ distance: null, duration: null })
    const [drawTheRoad, setDrawTheRoad] = React.useState(false)
    const [locationPermission, setLocationPermission] = React.useState(false)


    React.useEffect(() => { // To get the current location of the user
        const getLocation = async () => {
            const location = await requestLocationPermission()
            setLocationPermission(location.isDone)
            liveLocation(location.isDone)
            setUserCoordinate(location ? { lat: location.lat, long: location.long } : { lat: 37.78, long: -122.43 })
            handleMarkerClick(location)
            setLocationPermission(location ? location.isDone : false)
        }
        !locationPermission && getLocation()

    }, [])

    const liveLocation = (isDone) => {  // Real-time location tracking
        const watchId = Geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords
                setUserCoordinate({ lat: latitude, long: longitude })
            },
            error => {
                console.warn(error)
            },
            { enableHighAccuracy: true, distanceFilter: 1, interval: 3000 }
        )
        return () => {
            isDone && Geolocation.clearWatch(watchId)
        }
    }

    React.useEffect(() => { // To draw direction from favorite page
        if (route?.params !== undefined) {
            setRestaurantData(route.params.data)
            setDrawTheRoad(true)
        }
    }, [route])

    const { data, loading, error } = useFetch(userCoordinate)
    const mapRef = React.useRef()

    const handleMarkerClick = (coordinates = userCoordinate, type, restaurantData = null) => { // To handle specific restaurant
        mapRef.current.animateToRegion({
            latitude: coordinates.lat,
            longitude: coordinates.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        })
        if (type === 'restaurant') {
            setRestaurantData(restaurantData)
            setRestaurantModalVisible(true)
            setDrawTheRoad(false)
        }
    }

    const handleRoadData = (result, isDone = true) => { // To handle road directions data
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
            setDrawTheRoad(false)
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
                {restaurantData && drawTheRoad && <RoadLine
                    userCoordinate={userCoordinate}
                    restaurantData={restaurantData}
                    handleWayData={(result, isDone) => handleRoadData(result, isDone)}
                />}
            </MapView>
            {restaurantData && <RestaurantModal
                data={restaurantData}
                isVisible={restaurantModalVisible}
                closeRestaurantModal={() => setRestaurantModalVisible(false)}
                onDirectionButtonPress={() => {
                    setDrawTheRoad(true)
                    setRestaurantModalVisible(false)
                }}
                openAccount={() => {
                    setRestaurantModalVisible(false)
                    navigation.navigate('favorite', { openSettingsModal: true })
                    setRestaurantData(null)
                }}
            />}
            {drawTheRoad && <DirectionInfoCard
                data={roadData}
                centerTheWay={() => handleRoadData(roadData)}
                deleteWay={() => setDrawTheRoad(false)} />}
            <UserButton onPress={() => handleMarkerClick(userCoordinate, 'user')} />
            <SearchBar handleLocation={handleMarkerClick} />
        </View>
    )
}
