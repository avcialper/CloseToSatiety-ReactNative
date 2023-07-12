import { StyleSheet } from 'react-native'
import colors from '../../../utils/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: colors.main,
        margin: 10,
        padding: 8,
        borderRadius: 8
    },
    title: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
})