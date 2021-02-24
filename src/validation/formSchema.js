import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name is required, please fill out.')
        .min(3, 'Name must 3 characters or longer'),
    email: yup
        .string()
        .email('Must be a valid Email address')
        .required('Email is required'),
    password: yup
        .string()
        .required('A password is required. Please enter a password.'),
    tos: yup
        .boolean()
        .oneOf([true], 'Please indicate that you agree to the Terms of Service.')
})

export default formSchema
