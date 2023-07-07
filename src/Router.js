import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MapPage from './pages/MapPage'

const Tab = createMaterialBottomTabNavigator()

export default () => {

  return (
    <NavigationContainer  theme={{colors: {secondaryContainer: '#f2600a'}}}>
      <Tab.Navigator activeColor='black' inactiveColor='grey'>
        <Tab.Screen name='map' component={MapPage} options={{ title: 'Map', tabBarIcon: 'google-maps' }} />
        <Tab.Screen name='favorites' component={MapPage} options={{ title: 'Favorites', tabBarIcon: 'heart' }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
