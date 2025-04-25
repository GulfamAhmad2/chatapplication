import React, {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import {registerUser} from ''
import {toast} from 'react-toastify'
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("Register Successfu")
        }
    })
    return (
        <h1>Register User</h1>
    )
}

export default Register