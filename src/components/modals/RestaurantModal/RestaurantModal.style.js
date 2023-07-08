import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    container: {
        width: '100%',
        height: '40%',
        backgroundColor: 'whitesmoke',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    image: {
        width: '100%',
        height: '40%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        resizeMode: 'cover'
    },
    innerContainer: {
        flex: 1,
        padding: 8,
        justifyContent: 'space-around'
    },
    upperContainer: {
        flexDirection: 'row'
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        width: '82%'
    },
    upperRightContainer: {
        width: '18%',
        alignItems: 'center'
    },
    openClosed: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    typeIcon: {
        width: 20,
        height: 20,
        marginTop: 8
    },
    address: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
        width: '78%'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rating: {
        fontSize: 14,
        fontWeight: '500',
        marginHorizontal: 12
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    directionIconContainer: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(0, 0,  0, 0.5)',
        marginHorizontal: 8,
        padding: 8
    }
})