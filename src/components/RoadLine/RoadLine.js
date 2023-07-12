import { LogBox } from 'react-native'
import MapViewDirections from 'react-native-maps-directions' // Map package - directions
import { showFlashMesssage } from '../../utils/functions'   // Npm package assigned to the function
import { GOOGLE_API } from '@env'   // GOOGLE API
import colors from '../../utils/colors'

export default ({ userCoordinate, restaurantData, handleWayData }) => {
    return (
        <MapViewDirections
            apikey={GOOGLE_API}
            origin={{
                latitude: userCoordinate.lat,
                longitude: userCoordinate.long
            }}
            destination={{
                latitude: restaurantData.lat,
                longitude: restaurantData.long
            }}
            strokeWidth={4}
            strokeColor={colors.roadLine}
            onReady={result => handleWayData(result)} // To fetch directions
            onError={error => {
                if (error === 'Error on GMAPS route request: ZERO_RESULTS') {
                    showFlashMesssage('Road not found!')
                    LogBox.ignoreAllLogs(true)
                    handleWayData(null, false)
                }
            }}
            optimizeWaypoints={true}
        />
    )
}