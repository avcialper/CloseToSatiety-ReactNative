import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        borderWidth: 1.5,
        borderColor: colors.main,
        margin: 10,
        paddin: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    input: {
        flex: 1,
        color: 'black'
    },
    icon: {
        color: colors.main,
        fontSize: 25
    }
})