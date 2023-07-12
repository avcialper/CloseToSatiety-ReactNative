import * as yup from 'yup' // Yup package

const loginValidationsSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email address is required.'),
    password: yup
        .string()
        .min(6, ({ min }) => `Password must be least ${min} characters.`)
        .required('Password is required.')
})

const registerValidationsSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email address is required.'),
    password: yup
        .string()
        .min(6, ({ min }) => `Password must be least ${min} characters.`)
        .required('Password is required.'),
    passwordAgain: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password must match.')
})

export { loginValidationsSchema, registerValidationsSchema }