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
                language: 'tr'
            }}
            onPress={(data, details = null) => {
                handleLocation(
                    details?.geometry.location.lat,
                    details?.geometry.location.lng
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