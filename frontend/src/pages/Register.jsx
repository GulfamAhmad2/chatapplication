import React, {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
// import {registerUser} from ''
import {toast} from 'react-toastify'
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("Register Successfully")
        }
    })
    return (
        <div>
            <form>

            </form>
        </div>
    )
}

export default Register