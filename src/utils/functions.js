import { PermissionsAndroid } from "react-native"
import Geolocation from 'react-native-geolocation-service'
import RestaurantMarker from "../components/markers/RestaurantMarker"

export function renderRestaurantMarkers(restaurantsData, handleMarkerClick) {
    return restaurantsData.map(restaurant => {
        return (
            <RestaurantMarker 
                restaurant={restaurant}
                key={restaurant.place_id}
                onPress={handleMarkerClick} />
        )
    })
}

export async function requestLocationPermission() {
    return new Promise((resolve, reject) => {

        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Konum İzini",
                message: "Konum paylaşım izni verilsin mi?",
                buttonNeutral: "Daha Sonra Sor",
                buttonNegative: "Hayır",
                buttonPositive: "Evet"
            }
        )
            .then(granted => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        position => {
                            const { latitude, longitude } = position.coords
                            resolve({lat: latitude, long: longitude})
                        },
                        error => {
                            console.log("Error getting location")
                            reject(error)
                        }
                    );
                } else {
                    console.log("Location permission denied")
                    reject("Location permisson denied.")
                }
            })
            .catch(error => {
                console.warn(error)
                reject(error)
            })
    })
}