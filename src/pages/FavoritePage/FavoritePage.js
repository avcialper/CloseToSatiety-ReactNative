import React from 'react'
import { View, Text, FlatList } from 'react-native'
import FavoriteRestaurant from '../../components/FavoriteRestaurant' // Custom component
import RestaurantModal from '../../components/modals/RestaurantModal'   // Custom component
import SettingsModal from '../../components/modals/SettingsModal'   // Custom component
import SettingsButton from '../../components/buttons/SettingsButton'    // Custom component
import firestore from '@react-native-firebase/firestore'    // Firebase package - firestore database
import styles from './FavoritePage.style'

export default ({ navigation, route }) => {

    const [selectedRestaurant, setSelecedRestaurant] = React.useState(null)
    const [restaurantModalVisible, setRestaurantModalVisible] = React.useState(false)
    const [settingsModalVisible, setSettingsModalVisible] = React.useState(false)
    const [user, setUser] = React.useState(null)
    const [favoritesList, setFavoritesList] = React.useState([])

    React.useEffect(() => {
        const subscribe = firestore()   // Realtime data tracking
            .collection('users')
            .doc(user)
            .onSnapshot(snapshot => {
                setFavoritesList(snapshot.data() === undefined ? [] : snapshot.data().favorites)
            })

        return () => subscribe()
    }, [user])

    React.useEffect(() => { // You want to add a restaurant to the list, but an account is not open. Then SettingsMoal opens
        setSettingsModalVisible(route?.params !== undefined ? route?.params.openSettingsModal : false)
    }, [route?.params])

    const handleRestaurant = (data) => { // To handle specific restaurant
        setSelecedRestaurant(data)
        setRestaurantModalVisible(true)
    }

    // Render restaurants
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
                data={favoritesList}
                renderItem={renderFavoriteRestaurant}
                style={{ marginBottom: 60 }}
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