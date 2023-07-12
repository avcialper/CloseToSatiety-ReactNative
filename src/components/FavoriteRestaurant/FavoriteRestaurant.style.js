import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 3 * Dimensions.get('window').height / 20,
        margin: 8,
        borderRadius: 8,
        backgroundColor: colors.background
    },
    leftContainer: {
        flex: 1,
        padding: 8,
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
    },
    innerContainer: {

    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        fontWeight: '500',
        marginHorizontal: 12,
        color: 'black'
    },
    openClosed: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    image: {
        height: '100%',
        width: '35%',
        resizeMode: 'cover',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    }
})