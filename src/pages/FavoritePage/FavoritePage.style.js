import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    header: {
        backgroundColor: colors.main
    },
    title: {
        fontSize: 24,
        color: 'whitesmoke',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        fontStyle: 'italic',
    },
    emptyContainer: {
        marginTop: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        color: colors.main,
        fontSize: 36,
        fontWeight: 'bold'
    }
})