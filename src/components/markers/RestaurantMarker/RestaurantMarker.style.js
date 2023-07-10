import { StyleSheet } from 'react-native'
import colors from '../../../utils/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: colors.main,
        padding: 2,
        borderRadius: 12,
        width: 60
    },
    image: {
        width: 56,
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'white',
    }
})