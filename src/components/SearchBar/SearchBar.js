import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API } from '@env'
import styles from './SearchBar.style'

export default ({ handleLocation }) => {

    return (
        <GooglePlacesAutocomplete
            placeholder='Search restaurants'
            fetchDetails
            enablePoweredByContainer={false}
            query={{
                key: GOOGLE_API,
                language: 'en'
            }}
            textInputProps={{placeholderTextColor: 'grey'}}
            onPress={(data, details = null) => {
                handleLocation(
                    {
                        lat: details?.geometry.location.lat,
                        long: details?.geometry.location.lng
                    },
                    'restaurant',
                    {
                        address: details?.formatted_address,
                        name: details?.name,
                        photoURL: details?.photos[0].photo_reference !== undefined ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${details?.photos[0].photo_reference}&key=${GOOGLE_API}` :
                            'https://www.shutterstock.com/image-vector/details?-logo-food-service-vector-600w-454784548.jpg',
                        openNow: details?.opening_hours.open_now === undefined ? null : details?.opening_hours.open_now,
                        rating: details?.rating,
                        ratingTotal: details?.user_ratings_total,
                        icon: details?.icon,
                        lat: details?.geometry.location.lat,
                        long: details?.geometry.location.lng
                    }
                )
            }}
            styles={{
                container: styles.container,
                textInputContainer: styles.textInputContainer,
                textInput: styles.textInput,
                listView: styles.listView,
                description: styles.description
            }}
        />
    )
}