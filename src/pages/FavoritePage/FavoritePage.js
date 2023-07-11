import React from 'react'
import { View, Text, FlatList } from 'react-native'
import FavoriteRestaurant from '../../components/FavoriteRestaurant'
import RestaurantModal from '../../components/modals/RestaurantModal'
import SettingsButton from '../../components/SettingsButton'
import SettingsModal from '../../components/modals/SettingsModal'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import styles from './FavoritePage.style'

export default ({ navigation }) => {

    const fakeData = []

    const [selectedRestaurant, setSelecedRestaurant] = React.useState(null)
    const [restaurantModalVisible, setRestaurantModalVisible] = React.useState(false)
    const [settingsModalVisible, setSettingsModalVisible] = React.useState(false)
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        const data = firestore().collection('users').onSnapshot(data => console.log("data"))
        return () => data()
    }, [])

    const handleRestaurant = (data) => {
        setSelecedRestaurant(data)
        setRestaurantModalVisible(true)
    }

    const renderFavoriteRestaurant = ({ item }) => <FavoriteRestaurant data={item} onPress={handleRestaurant} />

    return (
        <View>
            <View style={styles.header} >
                <Text style={styles.title} >CLOSE TO SATIETY</Text>
                <SettingsButton onPress={() => setSettingsModalVisible(true)} />
            </View>
            <FlatList
                ListEmptyComponent={
                    <View style={styles.emptyContainer} >
                        <Text style={styles.emptyText} >LIST IS EMPTY</Text>
                    </View>
                }
                data={fakeData}
                renderItem={renderFavoriteRestaurant}
            />
            {selectedRestaurant && <RestaurantModal
                data={selectedRestaurant}
                closeRestaurantModal={() => setRestaurantModalVisible(false)}
                isVisible={restaurantModalVisible}
                onDirectionButtonPress={() => {
                    setRestaurantModalVisible(false)
                    navigation.navigate('map', { data: selectedRestaurant })
                }}
                buttonTitle='REMOVE TO FAVORITES'
            />}
            <SettingsModal
                isVisible={settingsModalVisible}
                closeSettingsModal={() => setSettingsModalVisible(false)}
                setUser={(email) => setUser(email)} />
        </View>
    )
}