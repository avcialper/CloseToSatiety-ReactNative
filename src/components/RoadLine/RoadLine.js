import { LogBox } from 'react-native'
import MapViewDirections from 'react-native-maps-directions'
import { showFlashMesssage } from '../../utils/functions'
import colors from '../../utils/colors'
import { GOOGLE_API } from '@env'

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
            strokeColor= {colors.roadLine}
            onReady={result => {
                handleWayData(result)
            }}
            onError={error => {
                if (error === 'Error on GMAPS route request: ZERO_RESULTS'){
                    showFlashMesssage('Road not found!')
                    LogBox.ignoreAllLogs(true)
                    handleWayData(null, false)
                } 
            }}
            optimizeWaypoints={true}
        />
    )
}