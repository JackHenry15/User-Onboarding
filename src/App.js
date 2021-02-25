
import React, { useState, useEffect } from 'react'
import './App.css';
import Form from './Form'
import formSchema from './validation/formSchema'
import * as yup from 'yup'
import axios from 'axios'

const initialFormValues = {
  //text
  name: '',
  email: '',
  password: '',
  //checkbox
  tos: false
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  tos: false
}

const initialUsers = []
const initialDisabled = true

function App() {
  //states
  const [users, setUsers] = useState(initialUsers) // array of users
  const [formValues, setFormValues] = useState(initialFormValues) //object
  const [formErrors, setFormErrors] = useState(initialFormErrors) //object
  const [disabled, setDisabled] = useState(initialDisabled) // boolean

  //helpers

  
  const postNewUser = newUser => {
    // on success add new user to state. helper POST newUser to `https://reqres.in/api/users`
    // clear the form too regardless
    axios
    .post(`https://reqres.in/api/users`, newUser)
    .then(res => {
      setUsers([
        ...users, res.data
      ])
      console.log(users)
    })
    .catch(err => {
      console.log('error', err);
    })
    setFormValues(initialFormValues);
  }


  //event handlers
  const inputChange = (name, value) => {
    // use yup for validation
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        //good path
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors})
      })
      setFormValues({
        ...formValues,
        [name]: value
      })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: [].filter(term => formValues[term])
    }
    postNewUser(newUser)
  }


  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div>
      <header><h1>User Onboarding</h1></header>
      <Form 
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors}   
      
      />
      <pre id='json'>{JSON.stringify(users)}</pre>
      
    </div>
  );
}

export default App;