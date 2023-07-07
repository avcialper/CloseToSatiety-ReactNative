import React from 'react'
import { View, Text, Image } from 'react-native'
import Modal from 'react-native-modal'
import { Rating } from 'react-native-ratings'
import { GOOGLE_API } from '@env'
import styles from './RestaurantModal.style'

export default ({ data, isVisible, closeRestaurantModal }) => {

    return (
        <Modal
            isVisible={isVisible}
            swipeDirection={'down'}
            animationIn={'fadeInUpBig'}
            animationOut={'fadeOutDownBig'}
            animationInTiming={800}
            animationOutTiming={800}
            onBackdropPress={closeRestaurantModal}
            onSwipeComplete={closeRestaurantModal}
            onBackButtonPress={closeRestaurantModal}
            style={styles.modal}
        >
            {data &&
                <View style={styles.container} >
                    <Image source={{
                        uri: data.photoURL !== null ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${data.photoURL}&key=${GOOGLE_API}` :
                            'https://www.shutterstock.com/image-vector/restaurant-logo-food-service-vector-600w-454784548.jpg'
                    }}
                        style={styles.image} />
                    <View style={styles.innerContainer} >
                        <View style={styles.upperContainer} >
                            <Text style={styles.name} >{data.name}</Text>
                            <View style={styles.upperRightContainer} >
                                <Text style={[styles.openClosed, data.openNow === null ? { color: '#f2600a' } : data.openNow ? { color: 'green' } : { color: 'red' }]} >{data.openNow === null ? 'Unknow' : data.openNow ? 'Open' : 'Closed'}</Text>
                                <Image source={{uri: data.icon}} style={styles.icon} />
                            </View>
                        </View>
                        <View style={styles.ratingContainer} >
                            <Rating
                                count={5}
                                startingValue={data.rating}
                                imageSize={24}
                                showRating={false}
                                readonly={true}
                            />
                            <Text style={styles.rating} >{data.rating} ({data.ratingTotal})</Text>
                        </View>
                        <Text style={styles.address} >{data.address}</Text>
                    </View>
                </View>
            }
        </Modal>
    )
}