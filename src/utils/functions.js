import RestaurantMarker from "../components/marker/RestaurantMarker"

export function renderRestaurnatMarkers(restaurantsData, handleMarkerClick) {
    return restaurantsData.map(restaurant => {
        return (
            <RestaurantMarker coordinate={{
                lat: restaurant.geometry.location.lat,
                long: restaurant.geometry.location.lng
            }}
                key={restaurant.place_id}
                photoURL={restaurant.photos[0].photo_reference}
                onPress={handleMarkerClick} />
        )
    })
}

