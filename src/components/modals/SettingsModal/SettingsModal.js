import React from 'react'
import { View, Image, Text, Keyboard } from 'react-native'
import Modal from 'react-native-modal'
import Input from '../../Input'
import CustomButton from '../../CustomButton'
import { Formik } from 'formik'
import { loginValidationsSchema, registerValidationsSchema } from '../../../utils/validations'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { showFlashMesssage } from '../../../utils/functions'
import { authErrors } from '../../../utils/authErrorMessages'
import styles from './SettingsModal.style'

export default ({ isVisible, closeSettingsModal, setUser }) => {

    const [authType, setAuthType] = React.useState({ type: 'LOGIN', text: 'Create an account.' })
    const [currentUser, setCurrentUser] = React.useState(null)

    const changeAuthType = () => {
        authType.type === 'LOGIN' ?
            setAuthType({ type: 'REGISTER', text: 'I have an account.' }) :
            setAuthType({ type: 'LOGIN', text: 'Create an account.' })
    }

    React.useEffect(() => {
        const data = auth().currentUser
        setCurrentUser(data ? { email: data.email } : null)
        if(data) setUser(data.email)
    }, [])

    const register = (value) => {
        Keyboard.dismiss()
        const { email, password } = value
        auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                closeSettingsModal()
                showFlashMesssage('User account created and sign in!')
                setCurrentUser({ email: email })
                createUserList(email)
                setUser(email)
                setAuthType({ type: 'LOGIN', text: 'Create an account.' })
            })
            .catch(error => showFlashMesssage(authErrors(error.code)))
    }

    const login = (value) => {
        Keyboard.dismiss()
        const { email, password } = value
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                closeSettingsModal()
                showFlashMesssage('Login successful!')
                setCurrentUser({ email: email })
                setUser(email)
            })
            .catch((error) => showFlashMesssage(authErrors(error.code)))
    }

    const logOut = () =>
        auth().signOut()
            .then(() => {
                closeSettingsModal()
                showFlashMesssage('Log out successful!')
                setCurrentUser(null)
                setUser(null)
            })
            .catch((error) => showFlashMesssage(authErrors(error.code)))

    const createUserList = (email) => {
        firestore()
            .collection('users')
            .doc(email)
            .set({ fovaries: [] })
            .then(() => console.log('Successful'))
            .catch(error => console.log(error))
    }

    return (
        <Modal
            isVisible={isVisible}
            swipeDirection={'down'}
            animationIn={'fadeInUpBig'}
            animationOut={'fadeOutDownBig'}
            animationInTiming={800}
            animationOutTiming={800}
            onBackdropPress={closeSettingsModal}
            onSwipeComplete={closeSettingsModal}
            onBackButtonPress={closeSettingsModal}
            avoidKeyboard={true}
        >
            <View style={styles.container} >
                <Image source={require('../../../assets/lastnightmeal.jpg')} style={styles.banner} />
                {currentUser ? <>
                    <View style={styles.userContainer} >
                        <Text style={styles.userMail} >{currentUser.email}</Text>
                        <CustomButton title={'LOG OUT'} onPress={logOut} />
                    </View>
                </> :
                    <>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                passwordAgain: ''
                            }}
                            onSubmit={values => authType.type === 'LOGIN' ? login(values) : register(values)}
                            validationSchema={authType.type === 'LOGIN' ?
                                loginValidationsSchema : registerValidationsSchema
                            }
                        >
                            {({ values, handleChange, handleSubmit, touched, errors }) => (
                                <>
                                    <Input
                                        onChangeText={handleChange('email')}
                                        placeholder={'Email'}
                                        text={values.email}
                                        firstIcon={'account'}
                                    />
                                    {touched.email && errors.email && <Text style={styles.error} >{errors.email}</Text>}
                                    <Input
                                        onChangeText={handleChange('password')}
                                        placeholder={'Password'}
                                        text={values.password}
                                        firstIcon={'eye-off'}
                                        secondIcon={'eye'}
                                        changeableIcon={true}
                                        isSecure={true}
                                    />
                                    {touched.password && errors.password && <Text style={styles.error} >{errors.password}</Text>}
                                    {authType.type === 'REGISTER' &&
                                        <>
                                            <Input
                                                onChangeText={handleChange('passwordAgain')}
                                                placeholder={'Password Again'}
                                                text={values.passwordAgain}
                                                firstIcon={'eye-off'}
                                                secondIcon={'eye'}
                                                changeableIcon={true}
                                                isSecure={true}
                                            />
                                            {touched.passwordAgain && errors.passwordAgain && <Text style={styles.error} >{errors.passwordAgain}</Text>}
                                        </>
                                    }
                                    <CustomButton title={authType.type} onPress={handleSubmit} />
                                </>
                            )}
                        </Formik>
                        <Text style={styles.text} onPress={changeAuthType}>{authType.text}</Text>
                    </>}
            </View>
        </Modal>
    )
}