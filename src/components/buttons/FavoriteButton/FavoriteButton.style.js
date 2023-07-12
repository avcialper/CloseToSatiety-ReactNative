import { StyleSheet } from 'react-native'
import colors from '../../../utils/colors'

export default StyleSheet.create({
    container: {
        height: '20%',
        width: '60%',
        backgroundColor: colors.main,
        padding: 4,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8
    },
    text: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    }
})