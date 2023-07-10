import React from 'react'
import { View, Text, FlatList } from 'react-native'
import FavoriteRestaurant from '../../components/FavoriteRestaurant'
import RestaurantModal from '../../components/modals/RestaurantModal'
import SettingsButton from '../../components/SettingsButton'
import styles from './FavoritePage.style'

export default ({ navigation }) => {

    const fakeData = []

    const [selectedRestaurant, setSelecedRestaurant] = React.useState(null)
    const [restaurantModalVisible, setRestaurantModalVisible] = React.useState(false)

    const handleRestaurant = (data) => {
        setSelecedRestaurant(data)
        setRestaurantModalVisible(true)
    }

    const renderFavoriteRestaurant = ({ item }) => <FavoriteRestaurant data={item} onPress={handleRestaurant} />

    return (
        <View>
            <View style={styles.header} >
                <Text style={styles.title} >CLOSE TO SATIETY</Text>
                <SettingsButton />
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
        </View>
    )
}