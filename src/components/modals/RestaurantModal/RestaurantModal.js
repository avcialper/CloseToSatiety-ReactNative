import React from 'react'
import { View, Text, Image } from 'react-native'
import Modal from 'react-native-modal' // Modal package
import { Rating } from 'react-native-ratings'   // Rating package - rating icon and stats
import auth from '@react-native-firebase/auth'  // Firebase package - authentication
import firestore from '@react-native-firebase/firestore' // Firebase package - firestore database
import DrawRoadButton from '../../buttons/DrawRoadButton'   // Custom component
import FavoriteButton from '../../buttons/FavoriteButton'   // Custom component
import { showFlashMesssage } from '../../../utils/functions'    // Npm package assigned to the function
import styles from './RestaurantModal.style'

export default ({ data, isVisible, closeRestaurantModal, onDirectionButtonPress, openAccount }) => {

    const [buttonTitle, setButtonTitle] = React.useState('Add To Favorites')
    const [userMail, setUserMail] = React.useState(null)

    React.useEffect(() => {
        const userData = auth().currentUser // To get current user data
        if (userData) {
            firestore().collection('users').doc(userData.email).get().then(documentSnapshot => {
                const list = documentSnapshot.data().favorites  // To get user's favorite list
                const isAdded = list.filter(item => item.id === data.id) // To search the restaurant in the list
                setButtonTitle(isAdded[0] === undefined ? 'Add To Favorites' : 'Remove From Favorites')
                setUserMail(userData.email)
            })
        } else {
            setUserMail(null)
            setButtonTitle('Add To Favorites')
        }
    }, [data])

    const addToFavorites = () => {      // To add new restaurant in the favorites list
        if (userMail) {
            firestore().collection('users').doc(userMail).update({
                favorites: firestore.FieldValue.arrayUnion(data)
            }).then(() => {
                showFlashMesssage('Restaurant added.')
                setButtonTitle('Remove From Favorites')
            })
                .catch(error => showFlashMesssage(error.code()))
        } else {
            openAccount()
            showFlashMesssage('Please login.')
        }
    }

    const removeFromFavorites = () => { // To remove restaurant from favorites list
        if (userMail) {
            firestore().collection('users').doc(userMail).update({
                favorites: firestore.FieldValue.arrayRemove(data)
            }).then(() => {
                showFlashMesssage('Restaurant removed.')
                setButtonTitle('Add To Favorites')
            })
                .catch(error => showFlashMesssage(error.code()))
        } else {
            openAccount()
            showFlashMesssage('Please login.')
        }
    }

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
                                tintColor={'whitesmoke'}
                            />
                            <Text style={styles.rating} >{data.rating} ({data.ratingTotal})</Text>
                        </View>
                        <View style={styles.bottomContainer} >
                            <Text style={styles.address} >{data.address}</Text>
                            <DrawRoadButton onDirectionButtonPress={onDirectionButtonPress} />
                        </View>
                        <FavoriteButton text={buttonTitle} onPress={() => {
                            buttonTitle === 'Add To Favorites' ? addToFavorites() : removeFromFavorites()
                        }} />
                    </View>
                </View>
            }
        </Modal>
    )
}