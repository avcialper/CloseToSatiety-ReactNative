import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import Modal from 'react-native-modal'
import { Rating } from 'react-native-ratings'
import DrawRoadButton from '../../DrawRoadButton'
import FavoriteButton from '../../FavoriteButton'
import styles from './RestaurantModal.style'

export default ({ data, isVisible, closeRestaurantModal, onDirectionButtonPress, buttonTitle = "akslf" }) => {

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
                    <Image source={{ uri: data.photoURL }}
                        style={styles.image} />
                    <View style={styles.innerContainer} >
                        <View style={styles.upperContainer} >
                            <Text style={styles.name} >{data.name}</Text>
                            <View style={styles.upperRightContainer} >
                                <Text style={[styles.openClosed, data.openNow === null ? { color: '#f2600a' } : data.openNow ? { color: 'green' } : { color: 'red' }]} >{data.openNow === null ? 'Unknow' : data.openNow ? 'Open' : 'Closed'}</Text>
                                <Image source={{ uri: data.icon }} style={styles.typeIcon} />
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
                        <View style={styles.bottomContainer} >
                            <Text style={styles.address} >{data.address}</Text>
                            <DrawRoadButton onDirectionButtonPress={onDirectionButtonPress} />
                        </View>
                        <FavoriteButton text={buttonTitle} onPress={() => console.log('first')} />
                    </View>
                </View>
            }
        </Modal>
    )
}