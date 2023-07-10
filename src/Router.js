import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MapPage from './pages/MapPage'
import FavoritePage from './pages/FavoritePage'
import FlashMessage from 'react-native-flash-message'

const Tab = createMaterialBottomTabNavigator()

export default () => {

  return (
    <NavigationContainer theme={{ colors: { secondaryContainer: '#f2600a' } }}>
      <Tab.Navigator activeColor='black' inactiveColor='grey'>
        <Tab.Screen name='favorite' component={FavoritePage} options={{ title: 'Favorites', tabBarIcon: 'heart' }} />
        <Tab.Screen name='map' component={MapPage} options={{ title: 'Map', tabBarIcon: 'google-maps' }} />
      </Tab.Navigator>
      <FlashMessage position={'top'} />
    </NavigationContainer>
  )
}
