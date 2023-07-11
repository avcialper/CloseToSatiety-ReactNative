import { StyleSheet } from 'react-native'
import colors from '../../../utils/colors'

export default StyleSheet.create({
    userContainer: {
        width: '100%',
        height: '50%',
        justifyContent: 'space-between'
    },
    userMail: {
        textAlign: 'center',
        fontSize: 24,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'black',
        marginTop: 64
    },
    container: {
        width: '100%',
        height: 450,
        backgroundColor: 'whitesmoke',
        borderRadius: 16
    },
    banner: {
        width: '100%',
        height: '25%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    text: {
        color: '#348fff',
        alignSelf: 'center'
    },
    error: {
        color: 'red',
        marginLeft: 16,
        marginTop: -8
    }
})