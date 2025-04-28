import React from 'react'
import {useQuery} from '@tanstack/react-query'
import { userProfile } from '../services/auth'

const Profile = () => {
    const {data:user, isPending, isError, error} = useQuery({
        queryKey: ['userProfile'],
        queryFn: userProfile
    })

    if (isPending) {
        return (
            <div>
                <p>Loading....</p> // we could use react-spinners here
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                <p>{error.message}</p>
            </div>
        )
    }
    return (
        <>
        <div>
            <h1>{user?.username}</h1>
            <p>
                { user?.role?.role === 1 && "Admin" }
                { user?.role?.role === 2 && "Moderator" }
                { user?.role?.role === 3 && "User" }
            </p>
            <p>Current public key: {user?.publicKey} </p>
        </div>
        </>
    )
}

export default Profile