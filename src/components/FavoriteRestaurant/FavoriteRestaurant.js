import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import styles from './FavoriteRestaurant.style'
import colors from '../../utils/colors'
import { Rating } from 'react-native-ratings'

export default ({ data, onPress }) => {

    return (
        data &&
        <Pressable style={styles.container} onPress={() => onPress(data)} >
            <View style={styles.leftContainer} >
                <Text style={styles.name} >{data.name}</Text>
                <View style={styles.innerContainer} >
                    <View style={styles.ratingContainer} >
                        <Rating
                            count={5}
                            startingValue={data.rating}
                            imageSize={20}
                            showRating={false}
                            readonly={true}
                            tintColor={colors.background}
                        />
                        <Text style={styles.rating} >{data.rating} ({data.ratingTotal})</Text>
                    </View>
                    <Text style={[styles.openClosed, data.openNow === null ? { color: '#f2600a' } : data.openNow ? { color: 'green' } : { color: 'red' }]} >{data.openNow === null ? 'Unknow' : data.openNow ? 'Open' : 'Closed'}</Text>
                </View>
            </View>
            <Image source={{ uri: data.photoURL }}
                style={styles.image} />
        </Pressable>
    )
}