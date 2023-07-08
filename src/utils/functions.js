import { PermissionsAndroid } from "react-native"
import Geolocation from 'react-native-geolocation-service'
import RestaurantMarker from "../components/markers/RestaurantMarker"
import {GOOGLE_API} from '@env'
import { showMessage } from "react-native-flash-message"

export function renderRestaurantMarkers(restaurantsData, handleMarkerClick) {
    return restaurantsData.map(restaurant => {
        return (
            <RestaurantMarker
                restaurant={{
                    address: restaurant.formatted_address,
                    name: restaurant.name,
                    photoURL: restaurant.photos[0].photo_reference !== undefined ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${restaurant.photos[0].photo_reference}&key=${GOOGLE_API}` :
                        'https://www.shutterstock.com/image-vector/restaurant-logo-food-service-vector-600w-454784548.jpg',
                    openNow: restaurant.opening_hours.open_now === undefined ? null : restaurant.opening_hours.open_now,
                    rating: restaurant.rating,
                    ratingTotal: restaurant.user_ratings_total,
                    icon: restaurant.icon,
                    lat: restaurant.geometry.location.lat,
                    long: restaurant.geometry.location.lng
                }}
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
                            resolve({ lat: latitude, long: longitude })
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

export function showFlashMesssage(message) {
    console.log(message)
    showMessage({
        message: message,
        type: 'default',
        backgroundColor: '#f2600a',
        color: 'black',
        animationDuration: 800
    })
}