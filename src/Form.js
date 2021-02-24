import React from 'react'

export default function Form(props){
    const {
        values,
        submit,
        change,
        disabled,
        errors
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const {name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

    return(
        <form onSubmit={onSubmit}>
            <div className='form-group inputs'>
                <h1>User Information</h1>
                {/* Text */}

                <label>Name:&nbsp;
                    <input
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />
                </label>

                <label>Email:&nbsp;
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                </label>

                <label>Password:&nbsp;
                    <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>
                <br></br>
                {/* Check Box */}
                <br></br>
                <label>I agree to the Terms of Service:&nbsp;
                    <input
                        type='checkbox'
                        name='tos'
                        checked={values.tos}
                        onChange={onChange}
                    />
                </label>
            </div>
            <div className='form-group submit'>
                <h4>Add User</h4>
                <div className='errors'>
                    {/* errors are rendered here */}
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>
                <br></br>
                <button disabled={disabled}>Submit</button>
            </div>
        </form>
    )



}