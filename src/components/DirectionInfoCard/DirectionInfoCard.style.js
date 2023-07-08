import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        width: '70%',
        left: 8,
        bottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'whitesmoke',
        padding: 4,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    textContainer: {
        padding: 8,
        justifyContent: 'space-around'
    },
    text: {
        fontWeight: '600',
        color: 'black'
    },
    icon: {
        borderLeftWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    }
})